import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const buyRuleId = {
  id: "01a094c4-6b93-75d0-82e2-450d321ef6b5",
  type: "argument",
  slug: "buy-rule-id",
  said: "--buy-rule-id",
  takes: "the id of the buy rule acted on",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
