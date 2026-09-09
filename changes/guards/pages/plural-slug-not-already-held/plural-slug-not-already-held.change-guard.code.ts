import { pageNamed } from "@akasha/pages/page-file-name"
import { slugOf, textAt, type Value } from "@akasha/pages/page-value"
import { unreadable, writtenIn } from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

const PAGE_TYPE = "page-type"

const PLURAL = "pluralSlug"

const TYPE = "type"

const TYPE_SLUG = "pageTypeSlug"

function pluralIn(value: Value | null): string | null {
  if (value === null) return null
  const said = textAt(value, TYPE) ?? textAt(value, TYPE_SLUG)
  if (said === null || slugOf(said) !== PAGE_TYPE) return null
  return textAt(value, PLURAL)
}

function statedIn(given: Guarding): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of given.shadow.index.everyOfType(PAGE_TYPE)) {
    const plural = pluralIn(given.shadow.pageOf(one.path))
    if (plural !== null) found.set(one.path, plural)
  }
  return found
}

function heldBesides(
  stated: ReadonlyMap<string, string>,
  path: string,
  plural: string
): string | null {
  for (const [held, said] of stated) {
    if (held === path || said !== plural) continue
    return `\`${path}\` states the plural slug \`${plural}\`, and \`${held}\` states that plural slug too`
  }
  return null
}

export function pluralSlugNotAlreadyHeld(given: Guarding): string | null {
  try {
    const pageTypes = given.shadow.index.pageTypesIn()
    const written = new Map<string, string>()
    for (const path of writtenIn(given).keys()) {
      if (!pageNamed(path, pageTypes)) continue
      const plural = pluralIn(given.shadow.pageOf(path))
      if (plural !== null) written.set(path, plural)
    }
    if (written.size === 0) return null
    const stated = statedIn(given)
    for (const [path, plural] of written) {
      const why = heldBesides(stated, path, plural)
      if (why !== null) return why
    }
    return null
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = pluralSlugNotAlreadyHeld
