import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const shugoCharaSeason2 = {
  id: "01a183d9-d698-7b48-a68b-9ef262db0bcd",
  type: "page-type/season",
  slug: "shugo-chara-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/shugo-chara"],
  position: 2,
  publishedAt: "2008-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "25858",
      externalLink: "https://www.themoviedb.org/tv/14451/season/2",
    },
  ],
  title: "Doki",
  posterPath: "/zmLrBPqwduV2lhHUoVzssK7GnyA.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:50:53.965Z",
  updatedAt: "2026-10-28T18:50:53.965Z",
} as const satisfies Season
