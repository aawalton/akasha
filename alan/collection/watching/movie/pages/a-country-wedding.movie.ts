import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCountryWedding = {
  id: "01a17499-8943-78d1-b9ad-691e21074f00",
  type: "page-type/movie",
  slug: "a-country-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-06-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "346489",
      externalLink: "https://www.themoviedb.org/movie/346489",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Country_Wedding" },
  ],
  title: "A Country Wedding",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt4814436",
  posterPath: "/df63EX5PPlq9UDuXUteU9rIg2up.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
