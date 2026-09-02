import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const trophiesBank = {
  id: "01a05fd0-4de9-7a25-9571-a7b5e98ae22e",
  pageTypeSlug: "temper-rule-template",
  slug: "trophies-bank",
  title: "Bank trophies",
  key: "trophies-bank",
  description:
    "Deposits miscellaneous trophies (keys, key fragments, toys, dungeon buff ingredients, material upgraders) in the bank for safekeeping.",
  categoryId: "trophies",
  displayOrder: 33,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
