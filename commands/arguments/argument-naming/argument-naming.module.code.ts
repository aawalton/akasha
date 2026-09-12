import { argumentsIn } from "akasha/commands/modules/help-writing/help-writing.module.code.ts"
import { slugOfPart } from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import type { Taking } from "akasha/commands/properties/taking.record-property.types.ts"
import {
  typeSlugById,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ARGUMENT_TYPE = "01a093fd-9102-76e8-958e-03d34cd41e25"

const SLUG = "slug"

const SAID = "said"

const TAKES = "takes"

export function linesIn(root: string): ReadonlyMap<string, Taking[number]> {
  const found = new Map<string, Taking[number]>()
  const type = typeSlugById(root, ARGUMENT_TYPE)
  if (type === null) return found
  for (const one of valuesOfType(root, type)) {
    const slug = one.value[SLUG]
    const said = one.value[SAID]
    const takes = one.value[TAKES]
    if (typeof slug !== "string" || typeof said !== "string" || typeof takes !== "string") continue
    found.set(slug, { said, takes })
  }
  return found
}

export function argumentsNamed(root: string, page: Record<string, unknown> | null): Taking {
  if (page === null) return []
  const named = argumentsIn(page)
  if (named.length === 0) return []
  const lines = linesIn(root)
  const held: Taking[number][] = []
  for (const part of named) {
    const one = lines.get(slugOfPart(part))
    if (one !== undefined) held.push(one)
  }
  return held
}
