import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detoxin = {
  id: "01a06572-95bd-7920-aad9-b86922f5effc",
  type: "page-type/world-spell",
  slug: "detoxin",
  title: "Detoxin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
