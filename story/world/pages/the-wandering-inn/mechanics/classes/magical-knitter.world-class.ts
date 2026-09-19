import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicalKnitter = {
  id: "01a0657e-022b-7bc2-950f-b4f299feb6fd",
  type: "page-type/world-class",
  slug: "magical-knitter",
  title: "Magical Knitter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
