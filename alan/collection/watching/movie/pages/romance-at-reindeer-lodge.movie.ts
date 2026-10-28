import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romanceAtReindeerLodge = {
  id: "01a17499-c95e-7cba-9762-a17e0ec4c4f9",
  type: "page-type/movie",
  slug: "romance-at-reindeer-lodge",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "490147",
      externalLink: "https://www.themoviedb.org/movie/490147",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Romance at Reindeer Lodge",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt7546978",
  posterPath: "/ouwogOw4qPSwPW1sJZQKCIVfS6q.jpg",
  voteAverage: 5.968,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
