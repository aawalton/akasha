import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const silversteelArmsmistress = {
  id: "01a0657e-0255-72e0-a755-91133732cb4a",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "silversteel-armsmistress",
  title: "Silversteel Armsmistress",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["wounded-warrior"],
  references: "jsonl",
} as const satisfies WorldClass
