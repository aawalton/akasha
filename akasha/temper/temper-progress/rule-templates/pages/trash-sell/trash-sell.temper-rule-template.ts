import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const trashSell = {
  id: "019e3104-2624-7509-9de0-8c51f78d2dfa",
  pageTypeSlug: "temper-rule-template",
  slug: "trash-sell",
  title: "Sell trash",
  key: "trash-sell",
  description: "Sells items categorized as trash. These have no crafting or collectible value.",
  categoryId: "trash",
  displayOrder: 36,
  action: "sell",
  active: false,
  goal: "sell",
} as const satisfies TemperRuleTemplate
