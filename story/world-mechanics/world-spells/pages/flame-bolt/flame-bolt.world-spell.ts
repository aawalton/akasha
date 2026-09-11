import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameBolt = {
  id: "01a06572-95c3-7dd9-b6e5-e1afcb8a1adc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flame-bolt",
  title: "Flame Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
