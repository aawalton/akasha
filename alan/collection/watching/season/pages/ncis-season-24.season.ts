import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason24 = {
  id: "01a1884b-ef87-7880-ad0d-52ed74e741d2",
  type: "page-type/season",
  slug: "ncis-season-24",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ncis"],
  position: 24,
  publishedAt: "2026-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "532133",
      externalLink: "https://www.themoviedb.org/tv/4614/season/24",
    },
  ],
  title: "NCIS Season 24",
  posterPath: "/oy8CuB0chcBmnAuzJZA5pB1yEc1.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
