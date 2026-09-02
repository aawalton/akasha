import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const toolsBank = {
  id: "01a05fd0-4de7-7986-aaa1-23f08af0fb36",
  pageTypeSlug: "temper-rule-template",
  slug: "tools-bank",
  title: "Bank tools",
  key: "tools-bank",
  description: "Deposits tools (lockpicks, repair kits, etc.) in the bank for safekeeping.",
  categoryId: "tools",
  displayOrder: 31,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
