import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const meldatSBurningRings = {
  id: "01a06572-95d2-7290-9259-043766675708",
  type: "page-type/world-spell",
  slug: "meldat-s-burning-rings",
  title: "Meldat’s Burning Rings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
