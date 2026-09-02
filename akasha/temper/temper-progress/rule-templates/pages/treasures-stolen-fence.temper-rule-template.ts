import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const treasuresStolenFence = {
  id: "01a05fd0-4de8-75f3-9e55-dd1b8c0aa58e",
  pageTypeSlug: "temper-rule-template",
  slug: "treasures-stolen-fence",
  title: "Fence stolen treasures",
  key: "treasures-stolen-fence",
  description:
    "Sells stolen treasures at a fence. Stolen treasures can't be sold to normal merchants.",
  categoryId: "treasures",
  displayOrder: 39,
  action: "fence-sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
