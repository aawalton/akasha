import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const date = {
  id: "01a094e1-a438-76ce-9640-19750d323a1b",
  type: "page-type/argument",
  slug: "date",
  said: "--date",
  takes: "the Mountain calendar date the act is filed under",
  value: "text",
  placeholder: "YYYY-MM-DD",
  createdAt: "2026-09-12T09:10:10.744Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
