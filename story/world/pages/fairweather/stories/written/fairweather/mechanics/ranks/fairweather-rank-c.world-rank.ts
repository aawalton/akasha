import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const fairweatherRankC = {
  id: "01a1021c-53f3-7876-a704-4858351176f1",
  type: "page-type/world-rank",
  slug: "fairweather-rank-c",
  title: "C",
  world: "world/fairweather",
  aliases: ["C-rank"],
  description: "A seasoned adventurer, trusted with the deeper floors and with dangerous quests.",
  place: 4,
} as const satisfies WorldRank
