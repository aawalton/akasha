import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const knightErrant = {
  id: "01a0657e-137c-74ae-ac8a-7bb304bc8199",
  type: "page-type/world-class",
  slug: "knight-errant",
  title: "Knight-Errant",
  world: "world/the-wandering-inn",
  aliases: ["Knight Errant", "knight-errants"],
  evolvesToSlugs: ["aura-knight"],
  references: "jsonl",
} as const satisfies WorldClass
