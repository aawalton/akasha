import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const berserker = {
  id: "01a0657e-133e-77f7-ba43-04e2ab7bf3cb",
  type: "page-type/world-class",
  slug: "berserker",
  title: "Berserker",
  world: "world/the-wandering-inn",
  aliases: ["berserkers"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
