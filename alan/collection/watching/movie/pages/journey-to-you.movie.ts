import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const journeyToYou = {
  id: "01a1749a-a94b-75f1-85ae-0ebbbb3f294b",
  type: "page-type/movie",
  slug: "journey-to-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1442889",
      externalLink: "https://www.themoviedb.org/movie/1442889",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Journey to You",
  genres: ["Romance"],
  imdbId: "tt35976712",
  posterPath: "/fU1JYm6daEHsuaVKp4aXvJ7jD2Q.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
