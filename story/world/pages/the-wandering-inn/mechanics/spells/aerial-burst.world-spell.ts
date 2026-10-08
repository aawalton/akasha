import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const aerialBurst = {
  id: "01a06572-95b3-7eb0-8657-1dadb2a2b5d4",
  type: "page-type/world-spell",
  slug: "aerial-burst",
  title: "Aerial Burst",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
