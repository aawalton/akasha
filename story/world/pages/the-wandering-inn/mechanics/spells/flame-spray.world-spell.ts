import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameSpray = {
  id: "01a06572-95c3-7b14-8fcf-7d502e00f39c",
  type: "page-type/world-spell",
  slug: "flame-spray",
  title: "Flame Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
