import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const potionsNormalSell = {
  id: "01a05fd0-4de4-7c6e-9f86-49374225ad93",
  pageTypeSlug: "temper-rule-template",
  slug: "potions-normal-sell",
  title: "Sell basic potions",
  key: "potions-normal-sell",
  description:
    "Sells normal (white) quality non-crafted potions. Crafted and higher-quality potions are kept.",
  categoryId: "potions",
  displayOrder: 42,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
