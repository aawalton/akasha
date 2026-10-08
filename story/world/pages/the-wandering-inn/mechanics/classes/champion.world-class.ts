import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const champion = {
  id: "01a0657e-01c3-71ab-af28-7b7ab4d56b1f",
  type: "page-type/world-class",
  slug: "champion",
  title: "Champion",
  world: "world/the-wandering-inn",
  appearanceCount: 49,
  aliases: ["champions"],
  evolvesFromSlugs: ["world-class/warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.939Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
