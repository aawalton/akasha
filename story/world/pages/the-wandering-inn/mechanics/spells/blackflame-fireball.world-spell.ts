import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blackflameFireball = {
  id: "01a06572-95b6-76db-a96d-98683e518148",
  type: "page-type/world-spell",
  slug: "blackflame-fireball",
  title: "Blackflame Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
