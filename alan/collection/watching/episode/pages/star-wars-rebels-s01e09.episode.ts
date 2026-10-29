import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e09 = {
  id: "01a18853-ddfc-7f8c-ba0a-4bbea3b7f03f",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e09",
  description:
    "The crew are forced into transporting some unusual cargo after an issue with a new acquaintance.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 9,
  publishedAt: "2015-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1034914",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/9",
    },
  ],
  title: "Idiot's Array",
  episodeType: "standard",
  stillPath: "/e6KvCum2UpFeNMTbgTcM8wK96AZ.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
