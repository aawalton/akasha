import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceBeam = {
  id: "01a06572-95c4-7352-8acc-732e445c30f5",
  type: "page-type/world-spell",
  slug: "force-beam",
  title: "Force Beam",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
