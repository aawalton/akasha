import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveFindsYou = {
  id: "01a1749a-c869-7de6-a387-971c4f9cc590",
  type: "page-type/movie",
  slug: "love-finds-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-08-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1726059",
      externalLink: "https://www.themoviedb.org/movie/1726059",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Finds You",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt43639037",
  posterPath: "/ySQAnr7xVzLiq3dt5ujyIxPOGMb.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
