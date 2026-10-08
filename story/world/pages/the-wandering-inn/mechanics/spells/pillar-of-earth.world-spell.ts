import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pillarOfEarth = {
  id: "01a06572-95da-713f-b31f-440ea1dbe0c6",
  type: "page-type/world-spell",
  slug: "pillar-of-earth",
  title: "Pillar of Earth",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
