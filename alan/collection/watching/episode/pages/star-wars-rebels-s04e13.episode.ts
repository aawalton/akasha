import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e13 = {
  id: "01a18853-ddff-77b4-b8d8-90886c8aa188",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e13",
  description:
    "While the other rebels engage the Imperial forces outside the Jedi temple, Ezra gains access inside and experiences a revelation.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 13,
  publishedAt: "2018-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1442879",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/13",
    },
  ],
  title: "A World Between Worlds",
  episodeType: "standard",
  stillPath: "/nPK3AZcba5WLL0KXeKl50V5e4AZ.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
