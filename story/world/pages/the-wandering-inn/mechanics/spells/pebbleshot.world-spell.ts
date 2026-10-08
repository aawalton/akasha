import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pebbleshot = {
  id: "01a06572-95da-73da-b17a-ab129e481eaf",
  type: "page-type/world-spell",
  slug: "pebbleshot",
  title: "Pebbleshot",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
