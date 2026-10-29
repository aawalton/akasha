import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e11 = {
  id: "01a1884b-ef79-7f9d-8ee7-24d2afb55cab",
  type: "page-type/episode",
  slug: "ncis-s17e11",
  description:
    'Gibbs must face the consequences of helping Ziva with "the one thing" she said she\'d take care of before returning to her family.',
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 11,
  publishedAt: "2020-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1997171",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/11",
    },
  ],
  title: "In the Wind",
  episodeType: "standard",
  stillPath: "/mPxECULZUpCFS32zHlMzSO6vYjp.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
