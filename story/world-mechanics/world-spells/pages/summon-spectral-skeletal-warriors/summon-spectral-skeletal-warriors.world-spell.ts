import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonSpectralSkeletalWarriors = {
  id: "01a06572-95e4-7a43-b7ad-9c6bdc21588e",
  type: "world-spell",
  slug: "summon-spectral-skeletal-warriors",
  title: "Summon Spectral Skeletal Warriors",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
