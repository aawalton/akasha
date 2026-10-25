import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aDanceInTheSnow = {
  id: "01a1749a-a948-78dd-816c-a1a1f91c8434",
  type: "page-type/movie",
  slug: "a-dance-in-the-snow",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361250",
      externalLink: "https://www.themoviedb.org/movie/1361250",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Dance in the Snow",
  genres: ["TV Movie", "Drama", "Comedy", "Romance"],
  imdbId: "tt33885270",
  posterPath: "/iQ7tv7hVUCILuVtkC7ske7GXeM6.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
