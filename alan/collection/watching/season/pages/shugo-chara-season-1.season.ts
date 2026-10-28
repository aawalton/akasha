import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const shugoCharaSeason1 = {
  id: "01a183d9-d697-7be9-9e43-d5c28ab872f0",
  type: "page-type/season",
  slug: "shugo-chara-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/shugo-chara"],
  position: 1,
  publishedAt: "2007-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "25857",
      externalLink: "https://www.themoviedb.org/tv/14451/season/1",
    },
  ],
  title: "Shugo Chara!",
  posterPath: "/mJE0w29xK5NA4wwP58r0qiXpab1.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:50:53.965Z",
  updatedAt: "2026-10-28T18:50:53.965Z",
} as const satisfies Season
