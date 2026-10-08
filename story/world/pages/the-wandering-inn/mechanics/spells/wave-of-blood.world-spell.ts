import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waveOfBlood = {
  id: "01a06572-95e9-7c19-acd6-ed63eaa5635d",
  type: "page-type/world-spell",
  slug: "wave-of-blood",
  title: "Wave of Blood",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
