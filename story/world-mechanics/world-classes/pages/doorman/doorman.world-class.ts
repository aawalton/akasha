import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const doorman = {
  id: "01a0657e-1356-7926-bedb-f952b87adaa5",
  type: "world-class",
  slug: "doorman",
  title: "Doorman",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
