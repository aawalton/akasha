import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e16 = {
  id: "01a18848-c2ba-7ba7-9def-1cfdefcd4f61",
  type: "page-type/episode",
  slug: "friends-s02e16",
  description:
    "After having a fight with Chandler, Joey decides to move out. Rachel and Phoebe decide to get tattoos. And, on his birthday, Mr. Geller receives the unsettling news that his best friend and his daughter are dating.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 16,
  publishedAt: "1996-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87700",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/16",
    },
  ],
  title: "The One Where Joey Moves Out",
  episodeType: "standard",
  stillPath: "/sNPUHrQcEXHHLOu3U1Tp5DtVRCG.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
