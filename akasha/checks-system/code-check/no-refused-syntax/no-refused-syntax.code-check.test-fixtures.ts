import { parsedAs } from "@akasha/code-system/code-source"
import type { Standing } from "./syntax-rule/syntax-rule.page-type.ts"

export const PROBE_AT = "akasha/one/probe.module.code.ts"

export function standing(text: string): Standing {
  return { path: PROBE_AT, source: parsedAs(PROBE_AT, text) }
}
