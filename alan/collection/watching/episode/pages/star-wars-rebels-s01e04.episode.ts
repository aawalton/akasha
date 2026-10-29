import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e04 = {
  id: "01a18853-ddfc-7674-9433-7c16c90b6b51",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e04",
  description:
    "The Rebels send Ezra on an undercover mission into the Imperial Academy to steal a decoder.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 4,
  publishedAt: "2014-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1014544",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/4",
    },
  ],
  title: "Breaking Ranks",
  episodeType: "standard",
  stillPath: "/6IGNd5V7zapN3xp2g5ZKr0LPx2G.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
