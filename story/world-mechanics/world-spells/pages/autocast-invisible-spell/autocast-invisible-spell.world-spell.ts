import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const autocastInvisibleSpell = {
  id: "01a06572-95b5-70e5-9859-6e3fca36fae8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "autocast-invisible-spell",
  title: "Autocast: Invisible Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
