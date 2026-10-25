import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesAVeryFoulPlay = {
  id: "01a1749a-06ba-7212-80fa-a0129636e115",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-a-very-foul-play",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 12,
  publishedAt: "2019-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "590123",
      externalLink: "https://www.themoviedb.org/movie/590123",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: A Very Foul Play",
  genres: ["Mystery", "TV Movie", "Thriller", "Crime"],
  imdbId: "tt9759872",
  posterPath: "/wIJ9u8pL2Pi7bAfDto4mLTy9i9.jpg",
  voteAverage: 7.464,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
