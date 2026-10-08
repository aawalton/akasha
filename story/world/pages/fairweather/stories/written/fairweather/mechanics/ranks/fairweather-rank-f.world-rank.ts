import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const fairweatherRankF = {
  id: "01a1021b-6295-7bff-a45c-35cb44cae9f5",
  type: "page-type/world-rank",
  slug: "fairweather-rank-f",
  title: "F",
  world: "world/fairweather",
  aliases: ["F-rank"],
  description:
    "The lowest guild rank, where every new adventurer starts: errands, gathering and the shallowest dungeon floors.",
  place: 1,
  createdAt: "2026-10-03T14:11:51.573Z",
  updatedAt: "2026-10-03T14:12:00.000Z",
} as const satisfies WorldRank
