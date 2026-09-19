import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const strategistOfSympathy = {
  id: "01a0657e-0260-70c0-8ce9-c9135128f863",
  type: "page-type/world-class",
  slug: "strategist-of-sympathy",
  title: "Strategist of Sympathy",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["tactician"],
  references: "jsonl",
} as const satisfies WorldClass
