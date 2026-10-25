import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haileyDeanMysteriesAWillToKill = {
  id: "01a17499-e803-7b38-a6cd-80e85ba9edab",
  type: "page-type/movie",
  slug: "hailey-dean-mysteries-a-will-to-kill",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hailey-dean-mysteries"],
  position: 6,
  publishedAt: "2018-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "529371",
      externalLink: "https://www.themoviedb.org/movie/529371",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hailey Dean Mysteries: A Will to Kill",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt8522168",
  posterPath: "/7wiRzNipUucMdXkypbwpYB8VCTS.jpg",
  voteAverage: 6.618,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
