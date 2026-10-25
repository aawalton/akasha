import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const makeMeAMatch = {
  id: "01a1749a-66bf-770f-a12c-01474ed0e680",
  type: "page-type/movie",
  slug: "make-me-a-match",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-06-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1119752",
      externalLink: "https://www.themoviedb.org/movie/1119752",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Make Me a Match",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27139675",
  posterPath: "/5rrxdDD4uwTXlyRvYHcrECnpXMC.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
