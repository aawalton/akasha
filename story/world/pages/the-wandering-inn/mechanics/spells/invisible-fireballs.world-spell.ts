import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisibleFireballs = {
  id: "01a06572-95cc-7f38-a290-249739c9f936",
  type: "page-type/world-spell",
  slug: "invisible-fireballs",
  title: "Invisible Fireballs",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
