import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cowboyBebopSeason1 = {
  id: "01a183d6-d2bf-7f4f-a801-2498a039b693",
  type: "page-type/season",
  slug: "cowboy-bebop-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cowboy-bebop"],
  position: 1,
  publishedAt: "1998-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "42587",
      externalLink: "https://www.themoviedb.org/tv/30991/season/1",
    },
  ],
  title: "Cowboy Bebop Season 1",
  posterPath: "/sGDfX8uXASlyZXUXhxQGqqh05Us.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:47:36.381Z",
  updatedAt: "2026-10-28T18:47:36.381Z",
} as const satisfies Season
