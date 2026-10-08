import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wish = {
  id: "01a06572-95ea-7d9b-ba70-cf7ecdb89644",
  type: "page-type/world-spell",
  slug: "wish",
  title: "Wish",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
