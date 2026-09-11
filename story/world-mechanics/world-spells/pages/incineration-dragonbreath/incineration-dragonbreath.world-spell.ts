import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const incinerationDragonbreath = {
  id: "01a06572-95cb-7b44-974f-a9789b307647",
  type: "world-spell",
  slug: "incineration-dragonbreath",
  title: "Incineration Dragonbreath",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
