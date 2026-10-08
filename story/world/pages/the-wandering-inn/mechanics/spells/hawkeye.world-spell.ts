import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hawkeye = {
  id: "01a06572-95c8-7bf9-ae08-71b3daba61e0",
  type: "page-type/world-spell",
  slug: "hawkeye",
  title: "Hawkeye",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
