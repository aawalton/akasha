import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const bonuses = {
  id: "01a0c5ff-5418-754d-b1d1-63bfac5e1099",
  type: "page-type/argument",
  slug: "bonuses",
  said: "--bonuses",
  takes: "what each named bonus adds, written as JSON",
  value: "text",
  placeholder: "json",
} as const satisfies Argument
