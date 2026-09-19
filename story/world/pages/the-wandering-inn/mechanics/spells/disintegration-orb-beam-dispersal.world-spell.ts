import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const disintegrationOrbBeamDispersal = {
  id: "01a06572-95bd-7eb8-986f-1bf6be5eb4da",
  type: "page-type/world-spell",
  slug: "disintegration-orb-beam-dispersal",
  title: "Disintegration Orb, Beam Dispersal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
