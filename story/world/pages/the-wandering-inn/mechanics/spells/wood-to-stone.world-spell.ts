import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const woodToStone = {
  id: "01a06572-95ea-76cc-aca8-10ee39f2a7c5",
  type: "page-type/world-spell",
  slug: "wood-to-stone",
  title: "Wood to Stone",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
