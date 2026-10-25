import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLoveClubTaraSTune = {
  id: "01a1749a-89ab-79aa-95e8-97344ddf45c6",
  type: "page-type/movie",
  slug: "the-love-club-tara-s-tune",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/the-love-club"],
  position: 4,
  publishedAt: "2023-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1084028",
      externalLink: "https://www.themoviedb.org/movie/1084028",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Love Club: Tara's Tune",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21158556",
  posterPath: "/yxJXJdXyZq0DhvASEjT7Q0h4I3D.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T20:45:25.537Z",
} as const satisfies Movie
