import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hoopsYoyoHauntedHalloween = {
  id: "01a17499-669f-7e95-84a3-86cdf88027b1",
  type: "page-type/movie",
  slug: "hoops-yoyo-haunted-halloween",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "275394",
      externalLink: "https://www.themoviedb.org/movie/275394",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hoops & Yoyo Haunted Halloween",
  posterPath: "/6jXucnppHpetPprnSgapSmV88PL.jpg",
  voteAverage: 9.333,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
