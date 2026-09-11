import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hexOfDamnation = {
  id: "01a06572-95c8-7836-8e69-d2974279c62f",
  type: "world-spell",
  slug: "hex-of-damnation",
  title: "Hex of Damnation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
