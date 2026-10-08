import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const global = {
  id: "01a094ca-722b-7a2f-9c6d-7534a42fa980",
  type: "page-type/argument",
  slug: "global",
  said: "--global",
  takes: "the global name dependents are enumerated for",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:44:50.603Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
