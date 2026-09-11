import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthPillar = {
  id: "01a06572-95be-7376-a41f-2827779eda86",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "earth-pillar",
  title: "Earth Pillar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
