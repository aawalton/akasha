import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const eraseMemory = {
  id: "01a06572-95bf-7392-a446-334b202f5e2e",
  type: "page-type/world-spell",
  slug: "erase-memory",
  title: "Erase Memory",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
