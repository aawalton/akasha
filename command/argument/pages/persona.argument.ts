import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const persona = {
  id: "01a094e6-8876-7cae-8b02-756067b8f04b",
  type: "page-type/argument",
  slug: "persona",
  said: "--persona",
  takes: "who this seat is, filling the role and the domain neither of which is said",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:15:31.318Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
