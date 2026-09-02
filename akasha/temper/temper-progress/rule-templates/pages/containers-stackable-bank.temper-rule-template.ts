import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const containersStackableBank = {
  id: "01a05fd0-4ddd-75d0-a7c7-70b58041f2e6",
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
