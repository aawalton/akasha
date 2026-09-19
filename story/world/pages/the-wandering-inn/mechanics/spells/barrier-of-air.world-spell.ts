import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfAir = {
  id: "01a06572-95b5-7e3e-ba34-fb7320108f2e",
  type: "page-type/world-spell",
  slug: "barrier-of-air",
  title: "Barrier of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
