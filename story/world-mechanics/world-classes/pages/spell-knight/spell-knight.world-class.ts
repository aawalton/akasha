import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const spellKnight = {
  id: "01a06586-0a50-7ff4-9115-9def34b8b1ed",
  type: "world-class",
  slug: "spell-knight",
  title: "Spell Knight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
