import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const companionGreenSell = {
  id: "01a05fd0-4ddd-758e-bf8d-7df6bd4c4df2",
  pageTypeSlug: "temper-rule-template",
  slug: "companion-green-sell",
  title: "Sell low-quality companion gear",
  key: "companion-green-sell",
  description:
    "Sells companion equipment of superior (blue) quality or lower. Higher-quality companion gear is preserved.",
  categoryId: "companion",
  displayOrder: 38,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
