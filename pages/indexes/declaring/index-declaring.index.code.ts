import { join } from "node:path"
import type { Entry } from "../entries/index-entries.module.code.ts"
import { indexDeclaring } from "./index-declaring.index.ts"

export const DECLARING_UNDER = indexDeclaring.name

export const DECLARING_AT = join(DECLARING_UNDER, "page-property.jsonl")

export function declaredOf(entries: readonly Entry[]): readonly Entry[] {
  return entries.map((one) => ({ at: DECLARING_AT, line: one.line }))
}
