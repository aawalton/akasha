import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const silversteelArmsmistress = {
  id: "01a0657e-0255-72e0-a755-91133732cb4a",
  type: "page-type/world-class",
  slug: "silversteel-armsmistress",
  title: "Silversteel Armsmistress",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["wounded-warrior"],
  references: "jsonl",
} as const satisfies WorldClass
