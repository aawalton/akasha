import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const fairweatherRankS = {
  id: "01a1021d-414a-782b-b639-e22cf6ec0c67",
  type: "page-type/world-rank",
  slug: "fairweather-rank-s",
  title: "S",
  world: "world/fairweather",
  aliases: ["S-rank"],
  description: "The highest guild rank, held by a handful of living legends.",
  place: 7,
} as const satisfies WorldRank
