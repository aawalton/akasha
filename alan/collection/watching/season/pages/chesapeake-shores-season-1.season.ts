import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const chesapeakeShoresSeason1 = {
  id: "01a18844-1d37-757e-a53a-e48a35418d39",
  type: "page-type/season",
  slug: "chesapeake-shores-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/chesapeake-shores"],
  position: 1,
  publishedAt: "2016-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "78888",
      externalLink: "https://www.themoviedb.org/tv/67265/season/1",
    },
  ],
  title: "Chesapeake Shores Season 1",
  posterPath: "/p2Du8U3PGq82SrsxNBjVn4wUPZH.jpg",
  voteAverage: 9.8,
  createdAt: "2026-10-29T15:25:27.731Z",
  updatedAt: "2026-10-29T15:25:27.731Z",
} as const satisfies Season
