import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const trashSell = {
  id: "01a05fd0-4de7-7608-9d2b-eb97ba8d597a",
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
