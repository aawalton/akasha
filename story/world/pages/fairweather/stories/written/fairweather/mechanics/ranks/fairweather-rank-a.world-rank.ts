import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const fairweatherRankA = {
  id: "01a1021c-f2f3-7bb7-9b89-8c7dbd4eca83",
  type: "page-type/world-rank",
  slug: "fairweather-rank-a",
  title: "A",
  world: "world/fairweather",
  aliases: ["A-rank"],
  description:
    "One of the few the guild calls on for the deepest dungeons and the city's worst days.",
  place: 6,
  createdAt: "2026-10-03T14:13:34.067Z",
  updatedAt: "2026-10-03T14:13:42.000Z",
} as const satisfies WorldRank
