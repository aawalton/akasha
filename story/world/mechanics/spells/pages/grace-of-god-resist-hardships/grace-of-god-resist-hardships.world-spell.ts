import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const graceOfGodResistHardships = {
  id: "01a06572-95c6-79c4-8c5d-fb5d2a10a82d",
  type: "page-type/world-spell",
  slug: "grace-of-god-resist-hardships",
  title: "Grace of God: Resist Hardships",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
