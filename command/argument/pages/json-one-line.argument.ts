import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const jsonOneLine = {
  id: "01a094cc-a094-7d7b-9c5d-1cee0842ab4c",
  type: "page-type/argument",
  slug: "json-one-line",
  said: "--json",
  takes: "answer the JSON on one line rather than indented",
  value: "none",
  createdAt: "2026-09-12T08:47:13.556Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
