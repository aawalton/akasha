import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const berserker = {
  id: "01a0657e-133e-77f7-ba43-04e2ab7bf3cb",
  type: "page-type/world-class",
  slug: "berserker",
  title: "Berserker",
  world: "world/the-wandering-inn",
  appearanceCount: 35,
  aliases: ["berserkers"],
  evolvesFromSlugs: ["world-class/warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.414Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
