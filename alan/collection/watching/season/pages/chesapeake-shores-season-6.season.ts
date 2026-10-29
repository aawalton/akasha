import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const chesapeakeShoresSeason6 = {
  id: "01a18844-1d37-7dad-95ce-a102d2fe9bcb",
  type: "page-type/season",
  slug: "chesapeake-shores-season-6",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/chesapeake-shores"],
  position: 6,
  publishedAt: "2022-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299128",
      externalLink: "https://www.themoviedb.org/tv/67265/season/6",
    },
  ],
  title: "Chesapeake Shores Season 6",
  posterPath: "/wAWnKnDwrhfUZZ3hKlwr23yBOwM.jpg",
  voteAverage: 10,
  createdAt: "2026-10-29T15:25:27.731Z",
  updatedAt: "2026-10-29T15:25:27.731Z",
} as const satisfies Season
