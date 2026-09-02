import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const foodNormalSell = {
  id: "01a05fd0-4de0-73de-9562-15cdd9031841",
  pageTypeSlug: "temper-rule-template",
  slug: "food-normal-sell",
  title: "Sell basic food",
  key: "food-normal-sell",
  description:
    "Sells normal (white) quality non-crafted food. Crafted and higher-quality food is kept.",
  categoryId: "food",
  displayOrder: 44,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
