import { dirname } from "node:path"
import type {
  Asked,
  Passage,
  Refused,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.types.ts"
import {
  namedIn,
  namingOf,
  pointedTo,
} from "akasha/change/modules/import-lines/import-lines.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import {
  landingOf,
  type Naming,
  specifierFor,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import ts from "typescript"

const EVERY = "*"

const BESIDE = "."

function rootedIn(naming: ReadonlyMap<string, string>): string | null {
  for (const [specifier, path] of naming) {
    if (path === EVERY && specifier.endsWith(`/${EVERY}`)) return specifier.slice(0, -EVERY.length)
  }
  return null
}

export function spelledAt(given: Asked, path: string, naming: Naming): string {
  const rooted = rootedIn(naming)
  return rooted === null ? specifierFor(dirname(given.from), path) : `${rooted}${path}`
}

function landingFor(
  at: string,
  spelled: string,
  given: Asked,
  naming: ReadonlyMap<string, string>
): string | null {
  if (spelled.startsWith(BESIDE)) {
    if (landingOf(at, spelled) !== given.from) return null
    return specifierFor(dirname(at), given.to)
  }
  const rooted = rootedIn(naming)
  if (rooted === null) return null
  const names = naming.get(spelled) === given.from || spelled === `${rooted}${given.from}`
  return names ? `${rooted}${given.to}` : null
}

function repointedAt(
  text: string,
  at: string,
  given: Asked,
  of: ReadonlySet<string>,
  naming: ReadonlyMap<string, string>
): readonly Passage[] {
  const source = parsedAs(at, text)
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    const named = one.moduleSpecifier
    if (bound === null || !ts.isStringLiteral(named)) continue
    const going = bound.elements.filter((each) => of.has(namingOf(each)))
    if (going.length === 0) continue
    const landing = landingFor(at, named.text, given, naming)
    if (landing === null) continue
    return pointedTo(text, source, one, bound, going, landing).map((each) => ({ at, ...each }))
  }
  return []
}

export function repointedIn(
  world: World,
  given: Asked,
  of: ReadonlySet<string>,
  naming: Naming
): readonly Passage[] | Refused {
  const found: Passage[] = []
  for (const at of world.index.importersOf(given.from)) {
    if (at === given.to) continue
    const held = world.textOf(at)
    if (held === null) return { refused: `\`${at}\` names what moved and could not be read` }
    found.push(...repointedAt(held, at, given, of, naming))
  }
  return found
}
