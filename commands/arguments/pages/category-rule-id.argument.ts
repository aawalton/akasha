import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const categoryRuleId = {
  id: "01a094c2-f216-73ef-a9e7-f3557e47eb46",
  type: "argument",
  slug: "category-rule-id",
  said: "--category-rule-id",
  takes: "the id of the category rule acted on",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
