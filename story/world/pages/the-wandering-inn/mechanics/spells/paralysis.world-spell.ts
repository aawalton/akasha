import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paralysis = {
  id: "01a06572-95da-7164-b7a2-d0f3367e2b17",
  type: "page-type/world-spell",
  slug: "paralysis",
  title: "Paralysis",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
