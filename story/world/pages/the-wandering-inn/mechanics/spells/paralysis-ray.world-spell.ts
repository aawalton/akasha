import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paralysisRay = {
  id: "01a06572-95da-72f4-9c31-43eb95673fe4",
  type: "page-type/world-spell",
  slug: "paralysis-ray",
  title: "Paralysis Ray",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
