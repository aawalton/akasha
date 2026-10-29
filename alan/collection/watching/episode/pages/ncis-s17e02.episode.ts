import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e02 = {
  id: "01a1884b-ef79-7d8e-b34e-08e7a6719a8e",
  type: "page-type/episode",
  slug: "ncis-s17e02",
  description:
    "With their lives in danger, Gibbs and Ziva’s rogue investigation takes an unexpected turn when a possible terrorist plot is revealed.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 2,
  publishedAt: "2019-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1932406",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/2",
    },
  ],
  title: "Into the Light",
  episodeType: "standard",
  stillPath: "/kJWVRdYlBR36W2LGzqTxFuSbGAp.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
