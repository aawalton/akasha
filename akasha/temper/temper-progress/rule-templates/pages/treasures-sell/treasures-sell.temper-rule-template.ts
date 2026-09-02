import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const treasuresSell = {
  id: "01a05fd0-4de8-749c-86ed-eb97687c739b",
  pageTypeSlug: "temper-rule-template",
  slug: "treasures-sell",
  title: "Sell common treasures",
  key: "treasures-sell",
  description:
    "Sells treasures up to superior (blue) quality at a merchant. Higher-quality treasures are preserved for banking or guild store listing.",
  categoryId: "treasures",
  displayOrder: 40,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
