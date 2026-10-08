import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const heatedAir = {
  id: "01a06572-95c8-7bee-8db5-ee740e374ab2",
  type: "page-type/world-spell",
  slug: "heated-air",
  title: "Heated Air",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
