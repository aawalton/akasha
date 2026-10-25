import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideMurderPastMidnight = {
  id: "01a17497-3828-7545-ba9e-6d157ff1e4b9",
  type: "page-type/movie",
  slug: "mcbride-murder-past-midnight",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 1,
  publishedAt: "2005-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "213428",
      externalLink: "https://www.themoviedb.org/movie/213428",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: Murder Past Midnight",
  genres: ["Mystery", "Drama", "Crime"],
  imdbId: "tt0422733",
  posterPath: "/kv4JdjJDaeM3wnrz3NNo40eiFbm.jpg",
  voteAverage: 7,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
