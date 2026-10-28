import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bocchiTheRockSeason2 = {
  id: "01a183d9-6b68-744f-a132-432d8243f1fe",
  type: "page-type/season",
  slug: "bocchi-the-rock-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/bocchi-the-rock"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "442768",
      externalLink: "https://www.themoviedb.org/tv/119100/season/2",
    },
  ],
  title: "BOCCHI THE ROCK! Season 2",
  posterPath: "/hwwmH8NINlcC1nq6obL3atz2HDY.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Season
