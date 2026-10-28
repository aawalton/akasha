import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fullmetalAlchemistBrotherhoodSeason1 = {
  id: "01a183d2-9b8e-7c75-9491-fe2b3dbecbd6",
  type: "page-type/season",
  slug: "fullmetal-alchemist-brotherhood-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/fullmetal-alchemist-brotherhood"],
  position: 1,
  publishedAt: "2009-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "43388",
      externalLink: "https://www.themoviedb.org/tv/31911/season/1",
    },
  ],
  title: "Fullmetal Alchemist: Brotherhood Season 1",
  posterPath: "/q7BlNJRNXRwkm5YGGLzxJATcbYs.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:43:00.104Z",
  updatedAt: "2026-10-28T18:43:00.104Z",
} as const satisfies Season
