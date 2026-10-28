import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const steinsGateSeason1 = {
  id: "01a183d4-f6a7-78ef-9653-f3ae005f9400",
  type: "page-type/season",
  slug: "steins-gate-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/steins-gate"],
  position: 1,
  publishedAt: "2011-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52237",
      externalLink: "https://www.themoviedb.org/tv/42509/season/1",
    },
  ],
  title: "Steins;Gate Season 1",
  posterPath: "/7pxxMq3xK9biFRaYi7ThxS6ZBpi.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Season
