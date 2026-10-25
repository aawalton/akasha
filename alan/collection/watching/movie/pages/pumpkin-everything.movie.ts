import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pumpkinEverything = {
  id: "01a1749a-464d-792b-8410-e580e40d2191",
  type: "page-type/movie",
  slug: "pumpkin-everything",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1020481",
      externalLink: "https://www.themoviedb.org/movie/1020481",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Pumpkin Everything",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt21413684",
  posterPath: "/nfuocAC2EuJ5XtAGKhysSO2J00C.jpg",
  voteAverage: 6.5,
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
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
