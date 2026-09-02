import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const drinkNormalSell = {
  id: "01a05fd0-4ddf-7fbe-ad15-fc424dff8da0",
  pageTypeSlug: "temper-rule-template",
  slug: "drink-normal-sell",
  title: "Sell basic drinks",
  key: "drink-normal-sell",
  description:
    "Sells normal (white) quality non-crafted drinks. Crafted and higher-quality drinks are kept.",
  categoryId: "drink",
  displayOrder: 45,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
