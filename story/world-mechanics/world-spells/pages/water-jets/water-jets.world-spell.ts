import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterJets = {
  id: "01a06572-95e9-79fc-95d2-c410f9f41290",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "water-jets",
  title: "Water Jets",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
