import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidWave = {
  id: "01a06572-95b3-7abe-8e04-8196001411c7",
  type: "page-type/world-spell",
  slug: "acid-wave",
  title: "Acid Wave",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
