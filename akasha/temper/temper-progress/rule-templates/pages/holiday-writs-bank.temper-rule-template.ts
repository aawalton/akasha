import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const holidayWritsBank = {
  id: "01a05fd0-4de1-7e59-a6dc-7eaa47e93b03",
  pageTypeSlug: "temper-rule-template",
  slug: "holiday-writs-bank",
  title: "Bank holiday writs",
  key: "holiday-writs-bank",
  description:
    "Stashes holiday event writs in the bank. Complete them during events for bonus rewards.",
  categoryId: "holiday-writs",
  displayOrder: 19,
  action: "move-to",
  active: false,
  goal: "task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
