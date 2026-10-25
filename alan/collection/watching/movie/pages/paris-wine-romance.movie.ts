import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const parisWineRomance = {
  id: "01a17499-e805-7763-8770-e19dc262af4a",
  type: "page-type/movie",
  slug: "paris-wine-romance",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594694",
      externalLink: "https://www.themoviedb.org/movie/594694",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Paris, Wine & Romance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10136826",
  posterPath: "/8Zeeuo6MANQanNiiKEk91OQpuzn.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
