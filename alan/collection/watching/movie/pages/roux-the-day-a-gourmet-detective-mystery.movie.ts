import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rouxTheDayAGourmetDetectiveMystery = {
  id: "01a1749a-259d-78ab-ad22-c506d3d4cfd1",
  type: "page-type/movie",
  slug: "roux-the-day-a-gourmet-detective-mystery",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/gourmet-detective"],
  position: 5,
  publishedAt: "2020-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "648597",
      externalLink: "https://www.themoviedb.org/movie/648597",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Roux the Day: A Gourmet Detective Mystery",
  genres: ["Drama", "Crime", "Mystery", "TV Movie"],
  imdbId: "tt9450768",
  posterPath: "/rPgeRdjSI4fbJIOhXKdPDn1jQET.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
