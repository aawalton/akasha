import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfThorns = {
  id: "01a06572-95b5-7254-9141-79799566369e",
  type: "page-type/world-spell",
  slug: "barrier-of-thorns",
  title: "Barrier of Thorns",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
