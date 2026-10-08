import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const seeInvisibility = {
  id: "01a06572-95df-7bcb-9661-084a0afa74eb",
  type: "page-type/world-spell",
  slug: "see-invisibility",
  title: "See Invisibility",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
