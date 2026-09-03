import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const treasuresEpicStolen = {
  id: "019e3104-261f-7668-98d5-65fc2dc8d58a",
  pageTypeSlug: "temper-rule-template",
  slug: "treasures-epic-stolen",
  title: "Launder epic+ treasures",
  key: "treasures-epic-stolen",
  description:
    "Launders stolen treasures of epic quality or higher. These are worth keeping — sell them legitimately or bank for later.",
  categoryId: "treasures",
  displayOrder: 30,
  action: "fence-launder",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
