import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waveOfApathy = {
  id: "01a06572-95e9-7f52-8cf8-fc00f5a460be",
  type: "page-type/world-spell",
  slug: "wave-of-apathy",
  title: "Wave of Apathy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
