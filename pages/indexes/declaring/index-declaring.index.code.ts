import { join } from "node:path"
import { indexDeclaring } from "akasha/pages/indexes/declaring/index-declaring.index.ts"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"

export const DECLARING_UNDER = indexDeclaring.name

export const DECLARING_AT = join(DECLARING_UNDER, "page-property.jsonl")

export function declaredOf(entries: readonly Entry[]): readonly Entry[] {
  return entries.map((one) => ({ at: DECLARING_AT, line: one.line }))
}
