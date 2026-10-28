import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const shugoCharaSeason3 = {
  id: "01a183d9-d698-7906-b04c-592247619a40",
  type: "page-type/season",
  slug: "shugo-chara-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/shugo-chara"],
  position: 3,
  publishedAt: "2009-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "25859",
      externalLink: "https://www.themoviedb.org/tv/14451/season/3",
    },
  ],
  title: "Party!",
  posterPath: "/qZXCrPD9EYMEaySeT0R9yyMt1xE.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:50:53.965Z",
  updatedAt: "2026-10-28T18:50:53.965Z",
} as const satisfies Season
