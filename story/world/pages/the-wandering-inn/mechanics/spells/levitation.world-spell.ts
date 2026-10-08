import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const levitation = {
  id: "01a06572-95cd-7f21-8fee-7df57084e2ce",
  type: "page-type/world-spell",
  slug: "levitation",
  title: "Levitation",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.405Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
