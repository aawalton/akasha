import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const tempestOfThunder = {
  id: "01a06572-95e6-793a-88cd-b57f48151f89",
  type: "page-type/world-spell",
  slug: "tempest-of-thunder",
  title: "Tempest of Thunder",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
