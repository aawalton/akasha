import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pillarOfFrost = {
  id: "01a06572-95da-71ab-816e-c51c541d043d",
  type: "page-type/world-spell",
  slug: "pillar-of-frost",
  title: "Pillar of Frost",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
