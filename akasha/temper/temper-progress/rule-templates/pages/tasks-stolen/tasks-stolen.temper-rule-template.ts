import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const tasksStolen = {
  id: "01a05fd0-4de6-7ee8-9356-fd6b2592bf21",
  pageTypeSlug: "temper-rule-template",
  slug: "tasks-stolen",
  title: "Launder stolen task items",
  key: "tasks-stolen",
  description:
    "Launders stolen task-type items (writs, maps, etc.) so they can be completed or banked.",
  categoryId: "tasks",
  displayOrder: 18,
  action: "fence-launder",
  active: false,
  goal: "task",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
