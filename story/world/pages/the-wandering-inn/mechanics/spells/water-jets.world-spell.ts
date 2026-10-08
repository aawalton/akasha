import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterJets = {
  id: "01a06572-95e9-79fc-95d2-c410f9f41290",
  type: "page-type/world-spell",
  slug: "water-jets",
  title: "Water Jets",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
