import type { WorldClass } from "../../world-class.page-type.ts"

export const summoner = {
  id: "01a06586-0a5f-7b11-b907-1115850e941e",
  pageTypeSlug: "world-class",
  slug: "summoner",
  title: "Summoner",
  worldSlug: "the-wandering-inn",
  aliases: ["summoners"],
  references: "jsonl",
} as const satisfies WorldClass
