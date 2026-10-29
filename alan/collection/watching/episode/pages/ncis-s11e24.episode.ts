import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e24 = {
  id: "01a1884b-ef71-77c5-b078-755c91938ff9",
  type: "page-type/episode",
  slug: "ncis-s11e24",
  description:
    "The NCIS team investigates whether a fire on a U.S. Navy ship that served as a secret detention site for indicted terrorists was accidental or an intentional diversion for an escape.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 24,
  publishedAt: "2014-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "975313",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/24",
    },
  ],
  title: "Honor Thy Father",
  episodeType: "finale",
  stillPath: "/9RPbioxRtdeA9VhAhxPb3OCuxlr.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
