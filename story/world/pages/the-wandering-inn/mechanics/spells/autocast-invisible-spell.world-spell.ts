import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autocastInvisibleSpell = {
  id: "01a06572-95b5-70e5-9859-6e3fca36fae8",
  type: "page-type/world-spell",
  slug: "autocast-invisible-spell",
  title: "Autocast: Invisible Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
