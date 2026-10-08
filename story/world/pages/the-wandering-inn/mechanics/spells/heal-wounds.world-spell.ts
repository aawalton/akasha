import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const healWounds = {
  id: "01a06572-95c8-73db-a02a-a7a648852100",
  type: "page-type/world-spell",
  slug: "heal-wounds",
  title: "Heal Wounds",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
