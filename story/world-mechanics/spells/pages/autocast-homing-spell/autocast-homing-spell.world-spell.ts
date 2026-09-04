import type { WorldSpell } from "../../world-spell.page-type.ts"

export const autocastHomingSpell = {
  id: "01a06572-95b5-7140-8d64-17112b1281fc",
  pageTypeSlug: "world-spell",
  slug: "autocast-homing-spell",
  title: "Autocast: Homing Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
