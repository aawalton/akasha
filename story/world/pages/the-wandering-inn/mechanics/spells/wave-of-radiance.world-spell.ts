import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waveOfRadiance = {
  id: "01a06572-95e9-7603-890a-f1481dcf473b",
  type: "page-type/world-spell",
  slug: "wave-of-radiance",
  title: "Wave of Radiance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
