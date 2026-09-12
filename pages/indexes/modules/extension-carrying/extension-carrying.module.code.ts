import { basename, dirname } from "node:path"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type {
  Carried,
  Kinded,
  Naming,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const EXTENSION_NAME = "extensionName"

const NAMED_EXTENSION_PROPERTY = "named-extension-property"

export function endingOf(path: string): string | null {
  const name = basename(path)
  const at = name.lastIndexOf(".")
  return at < 1 ? null : name.slice(at + 1)
}

export function heldNamed(
  path: string,
  naming: Iterable<Naming>,
  wanted: (value: Value) => boolean,
  carriedBy: (named: string) => Carried
): boolean {
  const ending = endingOf(path)
  if (ending === null) return false
  const folder = dirname(path)
  for (const one of naming) {
    const value = one.value
    if (value === null || !wanted(value)) continue
    if (value[EXTENSION_NAME] !== ending) continue
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const held = carriedBy(`${said.pageType}/${said.slug}`)
    if ("refused" in held) continue
    if (held.carrying.some((two) => dirname(two.path) === folder)) return true
  }
  return false
}

export function extensionsUnder(given: Kinded): readonly Naming[] {
  const found: Naming[] = []
  for (const kind of given.kindsUnder(NAMED_EXTENSION_PROPERTY)) {
    for (const listed of given.everyOfType(kind)) {
      found.push({ path: listed.path, value: given.valueAt(listed.path) })
    }
  }
  return found
}

const ENDINGS = new WeakMap<Kinded, readonly Naming[]>()

export function extensionsFor(given: Kinded): readonly Naming[] {
  const found = ENDINGS.get(given)
  if (found !== undefined) return found
  const made = extensionsUnder(given)
  ENDINGS.set(given, made)
  return made
}
