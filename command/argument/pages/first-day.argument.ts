import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const firstDay = {
  id: "01a094ef-4c48-7091-a5b4-46ff34ef1cee",
  type: "page-type/argument",
  slug: "first-day",
  said: "--since",
  takes: "the first civil day to bring in",
  value: "text",
  placeholder: "YYYY-MM-DD",
  default: "0001-01-01",
  createdAt: "2026-09-12T09:25:05.736Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
