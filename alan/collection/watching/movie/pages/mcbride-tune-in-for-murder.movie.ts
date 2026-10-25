import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideTuneInForMurder = {
  id: "01a17497-3828-7b5d-bb2f-ef2b2600a76d",
  type: "page-type/movie",
  slug: "mcbride-tune-in-for-murder",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 4,
  publishedAt: "2005-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "256275",
      externalLink: "https://www.themoviedb.org/movie/256275",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: Tune in for Murder",
  genres: ["Mystery", "Crime", "Drama"],
  imdbId: "tt0457410",
  posterPath: "/z0JNQSpL2qdI8EPRVVAisLX6irC.jpg",
  voteAverage: 6.6,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
