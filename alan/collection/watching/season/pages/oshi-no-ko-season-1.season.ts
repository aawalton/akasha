import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const oshiNoKoSeason1 = {
  id: "01a183d9-a610-79e9-97c7-d4cb928974a7",
  type: "page-type/season",
  slug: "oshi-no-ko-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/oshi-no-ko"],
  position: 1,
  publishedAt: "2023-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "296853",
      externalLink: "https://www.themoviedb.org/tv/203737/season/1",
    },
  ],
  title: "【OSHI NO KO】 Season 1",
  posterPath: "/rFp74PFpz14AHrtlVPrLyrSng47.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:50:41.549Z",
  updatedAt: "2026-10-28T18:50:41.549Z",
} as const satisfies Season
