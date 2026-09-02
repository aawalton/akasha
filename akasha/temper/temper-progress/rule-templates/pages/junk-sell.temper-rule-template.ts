import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const junkSell = {
  id: "01a05fd0-4de2-78aa-a1a5-02c90ffe8b96",
  pageTypeSlug: "temper-rule-template",
  slug: "junk-sell",
  title: "Sell junk",
  key: "junk-sell",
  description: "Sells items in the junk category at a merchant.",
  categoryId: "junk",
  displayOrder: 37,
  action: "sell",
  active: false,
  goal: "sell",
} as const satisfies TemperRuleTemplate
