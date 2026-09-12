import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const jsonOneLine = {
  id: "01a094cc-a094-7d7b-9c5d-1cee0842ab4c",
  type: "argument",
  slug: "json-one-line",
  said: "--json",
  takes: "answer the JSON on one line rather than indented",
  value: "none",
} as const satisfies Argument
