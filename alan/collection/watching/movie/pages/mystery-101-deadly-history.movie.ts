import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mystery101DeadlyHistory = {
  id: "01a1749a-464c-7e2f-96b6-97f0be4396b9",
  type: "page-type/movie",
  slug: "mystery-101-deadly-history",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-101"],
  position: 7,
  publishedAt: "2021-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "847357",
      externalLink: "https://www.themoviedb.org/movie/847357",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101: Deadly History",
  genres: ["TV Movie", "Crime", "Mystery"],
  imdbId: "tt14951396",
  posterPath: "/19pDGoSIq594OGEx3UQD1MFHzNY.jpg",
  voteAverage: 7.63,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
