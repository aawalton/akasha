import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const synchronizeSpell = {
  id: "01a06572-95e5-7a9c-bb49-2241a0a05ed4",
  type: "page-type/world-spell",
  slug: "synchronize-spell",
  title: "Synchronize Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.429Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
