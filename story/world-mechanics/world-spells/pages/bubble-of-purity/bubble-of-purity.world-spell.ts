import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bubbleOfPurity = {
  id: "01a06572-95b7-79d6-a06b-43afefb26df9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bubble-of-purity",
  title: "Bubble of Purity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
