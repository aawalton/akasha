import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fullmetalAlchemistSeason1 = {
  id: "01a183d2-7f42-73ec-94ad-720684c4fa92",
  type: "page-type/season",
  slug: "fullmetal-alchemist-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/fullmetal-alchemist"],
  position: 1,
  publishedAt: "2003-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "49207",
      externalLink: "https://www.themoviedb.org/tv/37863/season/1",
    },
  ],
  title: "Fullmetal Alchemist Season 1",
  posterPath: "/grcCY5Le3KnYZgL05nkFAIb1K0b.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:42:52.863Z",
  updatedAt: "2026-10-28T18:42:52.863Z",
} as const satisfies Season
