import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const masterWritsBank = {
  id: "01a05fd0-4de2-71af-844a-d1987a34a9bd",
  pageTypeSlug: "temper-rule-template",
  slug: "master-writs-bank",
  title: "Bank master writs",
  key: "master-writs-bank",
  description:
    "Stashes master writs in the bank. Master writs reward writ vouchers for high-end crafting station furnishings.",
  categoryId: "master-writs",
  displayOrder: 20,
  action: "move-to",
  active: false,
  goal: "task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
