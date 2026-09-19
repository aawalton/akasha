import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const champion = {
  id: "01a0657e-01c3-71ab-af28-7b7ab4d56b1f",
  type: "page-type/world-class",
  slug: "champion",
  title: "Champion",
  world: "world/the-wandering-inn",
  aliases: ["champions"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
