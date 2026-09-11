import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sushiChef = {
  id: "01a0657e-0262-76fa-a5a8-146bcc343d0a",
  type: "world-class",
  slug: "sushi-chef",
  title: "Sushi Chef",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
