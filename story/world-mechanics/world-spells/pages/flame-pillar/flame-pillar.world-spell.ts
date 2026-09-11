import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flamePillar = {
  id: "01a06572-95c3-7b72-bf9b-36daed522ad6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flame-pillar",
  title: "Flame Pillar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
