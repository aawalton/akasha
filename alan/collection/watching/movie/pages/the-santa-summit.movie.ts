import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSantaSummit = {
  id: "01a1749a-66c1-7bb4-ab0c-1316213f3ecb",
  type: "page-type/movie",
  slug: "the-santa-summit",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1142712",
      externalLink: "https://www.themoviedb.org/movie/1142712",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Santa Summit",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt29381717",
  posterPath: "/mS7fQ7GQf8U3WYodaYgPZ8FLtgi.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
