import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const slug = {
  id: "01a094db-e6d2-7981-bd86-3ae7e237cafb",
  type: "argument",
  slug: "slug",
  said: "--slug",
  takes: "the page the grade is recorded onto, named by its slug",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
