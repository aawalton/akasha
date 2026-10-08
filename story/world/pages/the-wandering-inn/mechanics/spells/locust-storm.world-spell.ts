import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const locustStorm = {
  id: "01a06572-95d0-74e2-b890-aa89c14efcaa",
  type: "page-type/world-spell",
  slug: "locust-storm",
  title: "Locust Storm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
