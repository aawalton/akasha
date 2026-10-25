import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const matchmakerMysteriesAFatalRomance = {
  id: "01a1749a-259b-7c58-9479-92bcdf65004a",
  type: "page-type/movie",
  slug: "matchmaker-mysteries-a-fatal-romance",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/matchmaker-mysteries"],
  position: 2,
  publishedAt: "2020-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "681630",
      externalLink: "https://www.themoviedb.org/movie/681630",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Matchmaker Mysteries: A Fatal Romance",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt11686340",
  posterPath: "/AscNWcxorJTjdnLFRyRPkWuOXw0.jpg",
  voteAverage: 7.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T20:45:16.967Z",
} as const satisfies Movie
