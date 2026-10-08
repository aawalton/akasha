import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const psychicSurgeon = {
  id: "01a0657e-0240-774e-937a-107c084d077c",
  type: "page-type/world-class",
  slug: "psychic-surgeon",
  title: "Psychic Surgeon",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/surgeon"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.064Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
