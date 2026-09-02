import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const recipesKnownSell = {
  id: "01a05fd0-4de5-72b6-a1c0-06691edc7d7a",
  pageTypeSlug: "temper-rule-template",
  slug: "recipes-known-sell",
  title: "Sell known recipes",
  key: "recipes-known-sell",
  description:
    "Sells recipes you've already learned, up to fine (green) quality. Higher-quality known recipes are preserved in case they have trade value.",
  categoryId: "recipes",
  displayOrder: 41,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
