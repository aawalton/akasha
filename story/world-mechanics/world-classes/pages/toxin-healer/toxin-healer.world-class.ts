import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const toxinHealer = {
  id: "01a0657e-026c-7276-b598-7e18cdd5f9b8",
  type: "world-class",
  slug: "toxin-healer",
  title: "Toxin Healer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
