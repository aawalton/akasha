import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e02 = {
  id: "01a18853-ddfc-7af9-8027-1f63487b7361",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e02",
  description:
    "Ezra and Zeb go to Lothal's market for provisions and to work on their relationship.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 2,
  publishedAt: "2014-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1053814",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/2",
    },
  ],
  title: "Fighter Flight",
  episodeType: "standard",
  stillPath: "/xFAk8Wh1dMWJ2eOLCQ1C1J2aNSI.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
