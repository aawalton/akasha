import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const realMurdersAnAuroraTeagardenMystery = {
  id: "01a17499-8948-76cb-9ef2-2502c156e4fe",
  type: "page-type/movie",
  slug: "real-murders-an-aurora-teagarden-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 2,
  publishedAt: "2015-07-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "339580",
      externalLink: "https://www.themoviedb.org/movie/339580",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Real Murders: An Aurora Teagarden Mystery",
  genres: ["Mystery", "TV Movie", "Drama", "Crime"],
  imdbId: "tt4618800",
  posterPath: "/rRILgctGqBniagwY4roJF158fDm.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
