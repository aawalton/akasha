import {
  lineOf,
  type Reference,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"

export function bodyOf(references: readonly Reference[]): string {
  const lines = [...new Set(references.map(lineOf))].sort()
  if (lines.length === 0) return ""
  return `${lines.join("\n")}\n`
}
