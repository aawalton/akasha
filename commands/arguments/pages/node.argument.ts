import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const node = {
  id: "01a09483-bb98-7630-920f-54904ebcffcc",
  type: "argument",
  slug: "node",
  said: "--node",
  takes: "the node acted on, as the node table names it",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
