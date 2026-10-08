import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spectralOrbs = {
  id: "01a06572-95e2-79ef-9457-7c71a9805e50",
  type: "page-type/world-spell",
  slug: "spectral-orbs",
  title: "Spectral Orbs",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
