import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const active = {
  id: "01a094b4-09eb-7311-ba19-5a7d755d8062",
  type: "page-type/argument",
  slug: "active",
  said: "--active",
  takes: "whether the rule is active",
  value: "true-or-false",
} as const satisfies Argument
