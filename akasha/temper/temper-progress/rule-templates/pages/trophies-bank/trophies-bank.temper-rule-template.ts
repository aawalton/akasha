import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const trophiesBank = {
  id: "019e3104-2621-7ca2-8422-38d1ebaf66d8",
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
