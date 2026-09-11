import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const conjureFootstool = {
  id: "01a06572-95b9-7c0b-826c-bad2eac7e209",
  type: "world-spell",
  slug: "conjure-footstool",
  title: "Conjure Footstool",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
