import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const glassNeedleSpray = {
  id: "01a06572-95c6-7648-adae-b99cc3c60496",
  type: "page-type/world-spell",
  slug: "glass-needle-spray",
  title: "Glass Needle Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
