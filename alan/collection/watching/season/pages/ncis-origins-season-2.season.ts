import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisOriginsSeason2 = {
  id: "01a1884b-534b-7c98-a9b3-74b8fdbbae38",
  type: "page-type/season",
  slug: "ncis-origins-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ncis-origins"],
  position: 2,
  publishedAt: "2025-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465506",
      externalLink: "https://www.themoviedb.org/tv/243006/season/2",
    },
  ],
  title: "NCIS: Origins Season 2",
  posterPath: "/eYa5uiA9VFN204oC7eaFKUdodE0.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Season
