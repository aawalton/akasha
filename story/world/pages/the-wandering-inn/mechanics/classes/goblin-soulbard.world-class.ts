import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinSoulbard = {
  id: "01a0657e-01e2-7ffb-9d79-01643ec6bab2",
  type: "page-type/world-class",
  slug: "goblin-soulbard",
  title: "Goblin Soulbard",
  world: "world/the-wandering-inn",
  appearanceCount: 19,
  evolvesFromSlugs: ["world-class/bard"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.970Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
