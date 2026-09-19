import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidWave = {
  id: "01a06572-95b3-7abe-8e04-8196001411c7",
  type: "page-type/world-spell",
  slug: "acid-wave",
  title: "Acid Wave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
