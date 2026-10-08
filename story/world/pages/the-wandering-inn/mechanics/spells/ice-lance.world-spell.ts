import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceLance = {
  id: "01a06572-95c9-7762-8cfd-3399d4c74370",
  type: "page-type/world-spell",
  slug: "ice-lance",
  title: "Ice Lance",
  world: "world/the-wandering-inn",
  appearanceCount: 16,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
