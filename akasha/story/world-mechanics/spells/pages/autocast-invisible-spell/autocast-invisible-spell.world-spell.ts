import type { WorldSpell } from "../../world-spell.page-type.ts"

export const autocastInvisibleSpell = {
  id: "01a06572-95b5-70e5-9859-6e3fca36fae8",
  pageTypeSlug: "world-spell",
  slug: "autocast-invisible-spell",
  title: "Autocast: Invisible Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
