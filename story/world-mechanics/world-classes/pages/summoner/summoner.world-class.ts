import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const summoner = {
  id: "01a06586-0a5f-7b11-b907-1115850e941e",
  type: "world-class",
  slug: "summoner",
  title: "Summoner",
  world: "the-wandering-inn",
  aliases: ["summoners"],
  references: "jsonl",
} as const satisfies WorldClass
