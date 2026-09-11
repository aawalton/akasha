import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rayOfIncineration = {
  id: "01a06572-95dc-7e3b-9c6b-3110048b8745",
  type: "world-spell",
  slug: "ray-of-incineration",
  title: "Ray of Incineration",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
