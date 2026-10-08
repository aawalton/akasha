import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const timezone = {
  id: "01a094d8-1f13-78e8-8b84-e36d2d8312b0",
  type: "page-type/argument",
  slug: "timezone",
  said: "--timezone",
  takes: "the IANA zone a start and an end carrying none are read in",
  value: "text",
  placeholder: "iana",
  createdAt: "2026-09-12T08:59:46.835Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
