import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whereYourHeartBelongs = {
  id: "01a1749a-464f-7fcb-b2f1-0dd95adbfdb5",
  type: "page-type/movie",
  slug: "where-your-heart-belongs",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "805761",
      externalLink: "https://www.themoviedb.org/movie/805761",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Where Your Heart Belongs",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt13826702",
  posterPath: "/pgy3W0o48YhNvZiGTOLITryzptN.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
