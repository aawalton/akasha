import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnceAndAlways = {
  id: "01a17499-c95d-77dc-b08f-5acb6eb494c5",
  type: "page-type/movie",
  slug: "love-once-and-always",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "501687",
      externalLink: "https://www.themoviedb.org/movie/501687",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, Once and Always",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt7785106",
  posterPath: "/uAtDSAVrlx0UIMZV50hKk1opiQF.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
