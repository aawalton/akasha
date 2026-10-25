import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBoneToPickAnAuroraTeagardenMystery = {
  id: "01a17499-8942-7e36-ae90-733213b3b11d",
  type: "page-type/movie",
  slug: "a-bone-to-pick-an-aurora-teagarden-mystery",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 1,
  publishedAt: "2015-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "325078",
      externalLink: "https://www.themoviedb.org/movie/325078",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Bone to Pick: An Aurora Teagarden Mystery",
  genres: ["Mystery", "Crime", "Drama", "TV Movie"],
  imdbId: "tt4200442",
  posterPath: "/rqpbgbIlErLBO39Y2kpYCi39Xxa.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T20:45:01.766Z",
} as const satisfies Movie
