import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const fairweatherRankB = {
  id: "01a1021c-a2bd-7ce9-8078-7f33b4660e02",
  type: "page-type/world-rank",
  slug: "fairweather-rank-b",
  title: "B",
  world: "world/fairweather",
  aliases: ["B-rank"],
  description: "A veteran adventurer whose name the city knows, sent where others cannot go.",
  place: 5,
  createdAt: "2026-10-03T14:13:13.533Z",
  updatedAt: "2026-10-03T14:13:22.000Z",
} as const satisfies WorldRank
