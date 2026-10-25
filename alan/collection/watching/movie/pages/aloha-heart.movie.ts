import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const alohaHeart = {
  id: "01a1749a-66bc-7ac2-9cd2-505a6f956735",
  type: "page-type/movie",
  slug: "aloha-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-07-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1135630",
      externalLink: "https://www.themoviedb.org/movie/1135630",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aloha Heart",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28145543",
  posterPath: "/9C8cJV2X63qQ5w1qvnoxwg0zeZf.jpg",
  voteAverage: 7.8,
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
