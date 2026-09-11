import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waveOfBlood = {
  id: "01a06572-95e9-7c19-acd6-ed63eaa5635d",
  type: "world-spell",
  slug: "wave-of-blood",
  title: "Wave of Blood",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
