import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const journeyOfMyHeart = {
  id: "01a1749a-259b-798d-9e94-1334e221b452",
  type: "page-type/movie",
  slug: "journey-of-my-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "866275",
      externalLink: "https://www.themoviedb.org/movie/866275",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Journey of My Heart",
  genres: ["TV Movie", "Romance", "Comedy", "Drama"],
  imdbId: "tt15006372",
  posterPath: "/gmcWVAKTJnbNXP9lmKYG82as4EQ.jpg",
  voteAverage: 7.333,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
