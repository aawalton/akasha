import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const midnightGoth = {
  id: "01a0657e-13a2-7620-987d-e0fadd517e5d",
  type: "page-type/world-class",
  slug: "midnight-goth",
  title: "Midnight Goth",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/goth"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.514Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
