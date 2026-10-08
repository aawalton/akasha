import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autocastHomingSpell = {
  id: "01a06572-95b5-7140-8d64-17112b1281fc",
  type: "page-type/world-spell",
  slug: "autocast-homing-spell",
  title: "Autocast: Homing Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
