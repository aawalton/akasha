import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameScythe = {
  id: "01a06572-95c3-7ada-a039-5b2366394776",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flame-scythe",
  title: "Flame Scythe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
