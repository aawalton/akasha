import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const inkSpray = {
  id: "01a06572-95cb-79bc-a0c6-b877d3a77e99",
  type: "page-type/world-spell",
  slug: "ink-spray",
  title: "Ink Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
