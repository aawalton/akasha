import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireballVolley = {
  id: "01a06572-95c1-7044-b5bb-b9f81174c462",
  type: "page-type/world-spell",
  slug: "fireball-volley",
  title: "Fireball Volley",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.393Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
