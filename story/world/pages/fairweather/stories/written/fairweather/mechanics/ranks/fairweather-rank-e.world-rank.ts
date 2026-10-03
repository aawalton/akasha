import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const fairweatherRankE = {
  id: "01a1021b-b6cb-7599-8bfc-1ce36e92def5",
  type: "page-type/world-rank",
  slug: "fairweather-rank-e",
  title: "E",
  world: "world/fairweather",
  aliases: ["E-rank"],
  description:
    "A proven beginner, trusted with escort work and the upper floors of the city's dungeons.",
  place: 2,
} as const satisfies WorldRank
