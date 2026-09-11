import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const greeter = {
  id: "01a0657e-01e5-77bb-b2e9-3f92b253cdad",
  type: "world-class",
  slug: "greeter",
  title: "Greeter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
