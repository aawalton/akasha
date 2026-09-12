import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const itemRuleId = {
  id: "01a094c5-8be4-7220-b5e7-19f6ceac265f",
  type: "argument",
  slug: "item-rule-id",
  said: "--item-rule-id",
  takes: "the id of the per-item rule acted on",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
