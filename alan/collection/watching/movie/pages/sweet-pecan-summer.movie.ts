import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sweetPecanSummer = {
  id: "01a1749a-259d-7265-b8eb-4aec21b227ae",
  type: "page-type/movie",
  slug: "sweet-pecan-summer",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "849283",
      externalLink: "https://www.themoviedb.org/movie/849283",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sweet Pecan Summer",
  genres: ["TV Movie", "Comedy", "Romance", "Family"],
  imdbId: "tt15202038",
  posterPath: "/rvjpCkGHr76bIuHv3lxPEs4RRTl.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
