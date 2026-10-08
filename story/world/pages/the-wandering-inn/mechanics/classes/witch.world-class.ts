import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witch = {
  id: "01a06586-0a7d-76d0-b07c-2a2e02b9565c",
  type: "page-type/world-class",
  slug: "witch",
  title: "Witch",
  world: "world/the-wandering-inn",
  appearanceCount: 222,
  aliases: ["WITCH"],
  evolvesToSlugs: ["world-class/witch-of-second-chances"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.461Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
