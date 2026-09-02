import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const surveyReportsBank = {
  id: "01a05fd0-4de6-7829-9128-62d05b4f8e09",
  pageTypeSlug: "temper-rule-template",
  slug: "survey-reports-bank",
  title: "Bank survey reports",
  key: "survey-reports-bank",
  description:
    "Stashes survey reports in the bank for later use. Survey reports lead to rich crafting material nodes.",
  categoryId: "survey-reports",
  displayOrder: 21,
  action: "move-to",
  active: false,
  goal: "task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
