import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const homingFireballs = {
  id: "01a06572-95c8-7435-b477-ea4a05f23e1c",
  type: "page-type/world-spell",
  slug: "homing-fireballs",
  title: "Homing Fireballs",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
