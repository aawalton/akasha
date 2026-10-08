import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const fairweatherRankD = {
  id: "01a1021c-0848-7833-80f5-eef0de664853",
  type: "page-type/world-rank",
  slug: "fairweather-rank-d",
  title: "D",
  world: "world/fairweather",
  aliases: ["D-rank"],
  description: "A working adventurer, licensed for full delves of the city's shallower dungeons.",
  place: 3,
  createdAt: "2026-10-03T14:12:33.992Z",
  updatedAt: "2026-10-03T14:12:42.000Z",
} as const satisfies WorldRank
