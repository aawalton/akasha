import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waveOfMercury = {
  id: "01a06572-95e9-7dee-ae4e-69278e626dae",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wave-of-mercury",
  title: "Wave of Mercury",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
