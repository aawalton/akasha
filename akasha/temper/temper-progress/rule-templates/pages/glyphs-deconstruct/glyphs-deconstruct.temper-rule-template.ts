import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const glyphsDeconstruct = {
  id: "01a05fd0-4de0-71ec-ab11-aa7c6b92e445",
  pageTypeSlug: "temper-rule-template",
  slug: "glyphs-deconstruct",
  title: "Deconstruct glyphs",
  key: "glyphs-deconstruct",
  description:
    "Deconstructs non-crafted glyphs for enchanting materials. Yields runes that can be reused in crafting.",
  categoryId: "glyphs",
  displayOrder: 27,
  action: "deconstruct",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
