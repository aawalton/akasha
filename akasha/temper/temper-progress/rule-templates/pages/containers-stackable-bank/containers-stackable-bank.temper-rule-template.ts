import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const containersStackableBank = {
  id: "019e3104-2607-7321-96e1-fb18f062084e",
  pageTypeSlug: "temper-rule-template",
  slug: "containers-stackable-bank",
  title: "Bank stackable containers",
  key: "containers-stackable-bank",
  description:
    "Deposits stackable containers (reward coffers, event boxes, etc.) in the bank. Open them later in bulk or save for events.",
  categoryId: "container-stackable",
  displayOrder: 2,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
