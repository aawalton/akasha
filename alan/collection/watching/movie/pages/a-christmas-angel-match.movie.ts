import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasAngelMatch = {
  id: "01a1749a-a947-7e6b-b535-83653be417ec",
  type: "page-type/movie",
  slug: "a-christmas-angel-match",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1538155",
      externalLink: "https://www.themoviedb.org/movie/1538155",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Angel Match",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt36503047",
  posterPath: "/cQPu03UcWxnnby7F5iUqU27MY0v.jpg",
  voteAverage: 6.5,
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
