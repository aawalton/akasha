import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS03e06 = {
  id: "01a1884b-534b-7c9c-98fa-6d0178c46602",
  type: "page-type/episode",
  slug: "ncis-origins-s03e06",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-3"],
  position: 6,
  publishedAt: "2026-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7982124",
      externalLink: "https://www.themoviedb.org/tv/243006/season/3/episode/6",
    },
  ],
  title: "Shot Through the Heart",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
