import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dirtSpray = {
  id: "01a06572-95bd-7063-a493-604d92d4802e",
  type: "page-type/world-spell",
  slug: "dirt-spray",
  title: "Dirt Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
