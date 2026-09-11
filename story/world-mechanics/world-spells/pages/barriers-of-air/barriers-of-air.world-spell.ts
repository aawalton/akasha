import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const barriersOfAir = {
  id: "01a06572-95b5-7351-a3d6-3ff7efb9981b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "barriers-of-air",
  title: "Barriers of Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
