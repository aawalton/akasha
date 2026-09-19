import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameJet = {
  id: "01a06572-95c3-71fb-92ee-d45f8bbfa0ec",
  type: "page-type/world-spell",
  slug: "flame-jet",
  title: "Flame Jet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
