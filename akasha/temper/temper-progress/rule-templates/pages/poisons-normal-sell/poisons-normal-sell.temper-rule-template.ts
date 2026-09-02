import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const poisonsNormalSell = {
  id: "01a05fd0-4de4-7ead-b116-3047ed03789a",
  pageTypeSlug: "temper-rule-template",
  slug: "poisons-normal-sell",
  title: "Sell basic poisons",
  key: "poisons-normal-sell",
  description:
    "Sells normal (white) quality non-crafted poisons. Crafted and higher-quality poisons are kept.",
  categoryId: "poisons",
  displayOrder: 43,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
