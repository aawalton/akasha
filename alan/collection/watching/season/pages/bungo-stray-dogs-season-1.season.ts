import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bungoStrayDogsSeason1 = {
  id: "01a183d8-d9d9-7c3b-a113-bdda78aeb975",
  type: "page-type/season",
  slug: "bungo-stray-dogs-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/bungo-stray-dogs"],
  position: 1,
  publishedAt: "2016-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "75442",
      externalLink: "https://www.themoviedb.org/tv/65931/season/1",
    },
  ],
  title: "Bungo Stray Dogs Season 1",
  posterPath: "/6AQmGhkYwAqW2OevjXbsh7tZnNO.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:49:49.269Z",
  updatedAt: "2026-10-28T18:49:49.269Z",
} as const satisfies Season
