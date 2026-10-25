import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInTheGreatSmokyMountainsANationalParkRomance = {
  id: "01a1749a-66be-755d-9782-96bf5446821a",
  type: "page-type/movie",
  slug: "love-in-the-great-smoky-mountains-a-national-park-romance",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["franchise/a-national-park-romance"],
  position: 2,
  publishedAt: "2023-09-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1154469",
      externalLink: "https://www.themoviedb.org/movie/1154469",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in the Great Smoky Mountains: A National Park Romance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt28455157",
  posterPath: "/7vef4sPL6J0enjW6czHBsJ3hVEu.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
