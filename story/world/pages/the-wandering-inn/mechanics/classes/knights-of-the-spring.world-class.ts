import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightsOfTheSpring = {
  id: "01a0657e-0218-7778-ab12-6d5e0b1b529b",
  type: "page-type/world-class",
  slug: "knights-of-the-spring",
  title: "Knights of the Spring",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
