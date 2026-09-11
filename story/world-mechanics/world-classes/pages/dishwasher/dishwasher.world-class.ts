import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const dishwasher = {
  id: "01a0657e-1353-7a35-a988-293fb4f2640f",
  type: "world-class",
  slug: "dishwasher",
  title: "Dishwasher",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
