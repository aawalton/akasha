import { parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import type { Standing } from "./syntax-rule/syntax-rule.page-type.ts"

export const PROBE_AT = "akasha/one/probe.module.code.ts"

export function standing(text: string): Standing {
  return { path: PROBE_AT, source: parsedAs(PROBE_AT, text) }
}
