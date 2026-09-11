import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningBolts = {
  id: "01a06572-95d0-74af-aeac-38d84afee6f0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightning-bolts",
  title: "Lightning Bolts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
