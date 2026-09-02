import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const craftedConsumablesNothing = {
  id: "01a05fd0-4dde-7f6f-bd4b-a6a4d7cb1218",
  pageTypeSlug: "temper-rule-template",
  slug: "crafted-consumables-nothing",
  title: "Protect crafted consumables",
  key: "crafted-consumables-nothing",
  description:
    "Prevents crafted food, drink, potions, poisons, and glyphs from being affected by lower-priority rules. Crafted consumables take ingredients and time to make — this keeps them safe from accidental sell or destroy rules.",
  categoryId: "consumables",
  displayOrder: 7,
  action: "nothing",
  active: false,
  goal: "use",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
