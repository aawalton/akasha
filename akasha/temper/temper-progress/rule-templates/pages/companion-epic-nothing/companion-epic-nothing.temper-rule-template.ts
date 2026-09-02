import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const companionEpicNothing = {
  id: "01a05fd0-4ddc-7e31-a19e-eb4b1a4a20d7",
  pageTypeSlug: "temper-rule-template",
  slug: "companion-epic-nothing",
  title: "Protect epic+ companion gear",
  key: "companion-epic-nothing",
  description:
    "Prevents epic (purple) quality or higher companion equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best companion gear.",
  categoryId: "companion",
  displayOrder: 4,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
