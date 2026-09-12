import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const persona = {
  id: "01a094e6-8876-7cae-8b02-756067b8f04b",
  type: "argument",
  slug: "persona",
  said: "--persona",
  takes: "who this seat is, filling the role and the domain neither of which is said",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
