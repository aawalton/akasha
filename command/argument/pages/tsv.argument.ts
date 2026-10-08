import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const tsv = {
  id: "01a094b8-89ab-716f-95ed-1fee817fdb66",
  type: "page-type/argument",
  slug: "tsv",
  said: "--tsv",
  takes: "answer as one tab-separated row rather than as JSON",
  value: "none",
  createdAt: "2026-09-12T08:25:16.971Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
