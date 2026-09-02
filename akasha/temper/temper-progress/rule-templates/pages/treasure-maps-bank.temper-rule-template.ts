import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const treasureMapsBank = {
  id: "01a05fd0-4de7-775b-b0b7-eae413c348ad",
  pageTypeSlug: "temper-rule-template",
  slug: "treasure-maps-bank",
  title: "Bank treasure maps",
  key: "treasure-maps-bank",
  description:
    "Stashes treasure maps in the bank for later use. Treasure maps lead to chests with set gear.",
  categoryId: "treasure-maps",
  displayOrder: 22,
  action: "move-to",
  active: false,
  goal: "task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
