import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameStrike = {
  id: "01a06572-95c3-7860-89cf-782467454a0e",
  type: "page-type/world-spell",
  slug: "flame-strike",
  title: "Flame Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
