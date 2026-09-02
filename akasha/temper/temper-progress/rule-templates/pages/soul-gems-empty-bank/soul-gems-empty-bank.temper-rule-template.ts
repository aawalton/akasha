import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const soulGemsEmptyBank = {
  id: "01a05fd0-4de6-7f82-b832-203c5a71218f",
  pageTypeSlug: "temper-rule-template",
  slug: "soul-gems-empty-bank",
  title: "Bank empty soul gems",
  key: "soul-gems-empty-bank",
  description:
    "Deposits empty (white quality) soul gems in the bank. Filled and crown soul gems are kept.",
  categoryId: "soul-gems",
  displayOrder: 23,
  action: "move-to",
  active: false,
  goal: "task",
  destination: "bank",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
