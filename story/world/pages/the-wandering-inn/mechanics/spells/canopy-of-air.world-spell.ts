import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const canopyOfAir = {
  id: "01a06572-95b8-7e34-b03a-388e480b9e23",
  type: "page-type/world-spell",
  slug: "canopy-of-air",
  title: "Canopy of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
