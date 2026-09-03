import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const masterWritsBank = {
  id: "019e3104-2617-7629-b790-576e7d97a15b",
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
