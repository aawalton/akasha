import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const treasuresEpicBank = {
  id: "01a05fd0-4de8-7864-b611-3c89ab795816",
  pageTypeSlug: "temper-rule-template",
  slug: "treasures-epic-bank",
  title: "Bank epic+ treasures",
  key: "treasures-epic-bank",
  description: "Banks epic quality or higher treasures for safekeeping or later sale.",
  categoryId: "treasures",
  displayOrder: 32,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
