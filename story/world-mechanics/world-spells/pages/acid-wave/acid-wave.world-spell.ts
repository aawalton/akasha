import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const acidWave = {
  id: "01a06572-95b3-7abe-8e04-8196001411c7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "acid-wave",
  title: "Acid Wave",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
