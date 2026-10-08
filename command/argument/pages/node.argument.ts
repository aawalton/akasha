import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const node = {
  id: "01a09483-bb98-7630-920f-54904ebcffcc",
  type: "page-type/argument",
  slug: "node",
  said: "--node",
  takes: "the node acted on, as the node table names it",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T07:27:36.344Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
