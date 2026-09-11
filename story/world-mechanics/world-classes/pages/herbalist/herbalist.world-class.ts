import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const herbalist = {
  id: "01a0657e-1372-7eca-9784-e1697494df2d",
  type: "world-class",
  slug: "herbalist",
  title: "Herbalist",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
