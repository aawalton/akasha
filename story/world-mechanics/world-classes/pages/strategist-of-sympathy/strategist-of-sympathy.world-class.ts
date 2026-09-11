import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const strategistOfSympathy = {
  id: "01a0657e-0260-70c0-8ce9-c9135128f863",
  type: "world-class",
  slug: "strategist-of-sympathy",
  title: "Strategist of Sympathy",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["tactician"],
  references: "jsonl",
} as const satisfies WorldClass
