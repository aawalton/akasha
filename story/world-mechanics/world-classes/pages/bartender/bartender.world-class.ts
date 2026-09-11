import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bartender = {
  id: "01a0657e-133c-70c4-965c-80dbd7657f46",
  type: "world-class",
  slug: "bartender",
  title: "Bartender",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
