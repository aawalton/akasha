import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const tsv = {
  id: "01a094b8-89ab-716f-95ed-1fee817fdb66",
  type: "argument",
  slug: "tsv",
  said: "--tsv",
  takes: "answer as one tab-separated row rather than as JSON",
  value: "none",
} as const satisfies Argument
