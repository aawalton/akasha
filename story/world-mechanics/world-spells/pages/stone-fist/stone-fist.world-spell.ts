import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneFist = {
  id: "01a06572-95e3-748e-898a-9410316b9791",
  type: "world-spell",
  slug: "stone-fist",
  title: "Stone Fist",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
