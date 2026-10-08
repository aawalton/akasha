import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceLanceBarrage = {
  id: "01a06572-95c9-7fbc-a469-41cb4cba925b",
  type: "page-type/world-spell",
  slug: "ice-lance-barrage",
  title: "Ice Lance Barrage",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
