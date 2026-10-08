import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const tremor = {
  id: "01a06572-95e7-7aac-b4b5-99cd99db9630",
  type: "page-type/world-spell",
  slug: "tremor",
  title: "Tremor",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
