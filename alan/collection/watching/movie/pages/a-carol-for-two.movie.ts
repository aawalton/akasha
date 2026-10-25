import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCarolForTwo = {
  id: "01a1749a-89a6-75c3-b36f-178f2a104657",
  type: "page-type/movie",
  slug: "a-carol-for-two",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360779",
      externalLink: "https://www.themoviedb.org/movie/1360779",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Carol for Two",
  genres: ["TV Movie", "Comedy", "Romance", "Music"],
  imdbId: "tt31438256",
  posterPath: "/lMkhgLoGsLj2wpQnTQ9IlskI0Yc.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
