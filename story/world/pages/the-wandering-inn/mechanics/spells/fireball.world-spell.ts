import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireball = {
  id: "01a06572-95c2-741f-886e-95cb617df47d",
  type: "page-type/world-spell",
  slug: "fireball",
  title: "Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 221,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.394Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
