import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGodwinkChristmasMeantForLove = {
  id: "01a1749a-06b9-7617-ada6-244ca07d0501",
  type: "page-type/movie",
  slug: "a-godwink-christmas-meant-for-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/a-godwink-christmas"],
  position: 2,
  publishedAt: "2019-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630900",
      externalLink: "https://www.themoviedb.org/movie/630900",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Godwink Christmas: Meant for Love",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10926350",
  posterPath: "/qSAlA5PlKUGmn4S3sNszZ4iXFuM.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
