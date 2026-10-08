import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const petrification = {
  id: "01a06572-95da-7c34-a170-cce58c15c014",
  type: "page-type/world-spell",
  slug: "petrification",
  title: "Petrification",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
