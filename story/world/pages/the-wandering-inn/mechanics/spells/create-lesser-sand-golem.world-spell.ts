import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createLesserSandGolem = {
  id: "01a06572-95bb-7699-bd15-aeb68e06cd87",
  type: "page-type/world-spell",
  slug: "create-lesser-sand-golem",
  title: "Create Lesser Sand Golem",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
