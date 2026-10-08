import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const braveSkirmisher = {
  id: "01a0657e-1340-7135-9b05-39d98054c81e",
  type: "page-type/world-class",
  slug: "brave-skirmisher",
  title: "Brave Skirmisher",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  evolvesFromSlugs: ["world-class/skirmisher"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.416Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
