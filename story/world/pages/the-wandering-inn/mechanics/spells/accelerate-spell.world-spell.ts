import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const accelerateSpell = {
  id: "01a06572-95b3-7590-9dda-d12bb232b6a2",
  type: "page-type/world-spell",
  slug: "accelerate-spell",
  title: "Accelerate Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
