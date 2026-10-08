import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceOrb = {
  id: "01a06572-95c4-711f-b762-e6ec165dfd21",
  type: "page-type/world-spell",
  slug: "force-orb",
  title: "Force Orb",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
