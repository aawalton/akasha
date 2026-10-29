import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const severanceS02e02 = {
  id: "01a1887f-8747-7dca-9ffd-2a72de7bb57f",
  type: "page-type/episode",
  slug: "severance-s02e02",
  description: "Mark contemplates the meaning of a message.",
  ownLength: 49,
  ownProgress: 49,
  partOfCollections: ["season/severance-season-2"],
  position: 2,
  publishedAt: "2025-01-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5469115",
      externalLink: "https://www.themoviedb.org/tv/95396/season/2/episode/2",
    },
  ],
  title: "Goodbye, Mrs. Selvig",
  episodeType: "standard",
  stillPath: "/wjlSkqMoLngSO6fv2Ajt2CIeCSi.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:21.510Z",
  updatedAt: "2026-10-29T16:30:21.510Z",
} as const satisfies Episode
