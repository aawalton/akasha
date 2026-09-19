import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lavaWave = {
  id: "01a06572-95cc-764c-9c4d-4482bbd25303",
  type: "page-type/world-spell",
  slug: "lava-wave",
  title: "Lava Wave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
