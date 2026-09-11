import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const heatVision = {
  id: "01a06572-95c8-7c0b-a651-0792edced115",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "heat-vision",
  title: "Heat Vision",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
