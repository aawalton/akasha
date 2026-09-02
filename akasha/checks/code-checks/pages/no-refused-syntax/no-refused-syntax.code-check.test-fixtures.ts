import { parsedAs } from "@akasha/code-system/code-source"
import type { Standing } from "./syntax-rules/syntax-rule.page-type.ts"

export const PROBE_AT = "akasha/one/probe.module.code.ts"

export function parsed(text: string): Standing {
  return { path: PROBE_AT, source: parsedAs(PROBE_AT, text) }
}
