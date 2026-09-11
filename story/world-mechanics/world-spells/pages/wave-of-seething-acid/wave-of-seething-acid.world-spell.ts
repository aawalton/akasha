import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waveOfSeethingAcid = {
  id: "01a06572-95e9-7ed4-9c15-1f98be92d4af",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wave-of-seething-acid",
  title: "Wave of Seething Acid",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
