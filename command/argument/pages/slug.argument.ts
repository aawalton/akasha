import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const slug = {
  id: "01a094db-e6d2-7981-bd86-3ae7e237cafb",
  type: "page-type/argument",
  slug: "slug",
  said: "--slug",
  takes: "the page the grade is recorded onto, named by its slug",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:03:54.578Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
