import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const whiteoutBlizzard = {
  id: "01a06572-95ea-7151-8875-4663188ab605",
  type: "page-type/world-spell",
  slug: "whiteout-blizzard",
  title: "Whiteout Blizzard",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
