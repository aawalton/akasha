import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massLevitation = {
  id: "01a06572-95d2-7013-a596-27a28a5ce626",
  type: "page-type/world-spell",
  slug: "mass-levitation",
  title: "Mass Levitation",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
