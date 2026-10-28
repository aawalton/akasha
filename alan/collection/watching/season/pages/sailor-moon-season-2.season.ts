import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sailorMoonSeason2 = {
  id: "01a183d8-489c-797d-98de-f9dc6f72555e",
  type: "page-type/season",
  slug: "sailor-moon-season-2",
  description:
    "The Sailor Guardians are called back into action when powerful new enemies appear! The coming battle won't be easy, and it gets more complicated when a mysterious pinkhaired girl falls from the sky and goes after Mamoru!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/sailor-moon"],
  position: 2,
  publishedAt: "1993-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60116",
      externalLink: "https://www.themoviedb.org/tv/3570/season/2",
    },
  ],
  title: "R",
  posterPath: "/1Enoeuflth0bMDztE9UgeQffBm6.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Season
