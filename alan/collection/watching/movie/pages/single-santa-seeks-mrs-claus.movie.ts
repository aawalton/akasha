import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const singleSantaSeeksMrsClaus = {
  id: "01a17497-382a-76f0-b22b-4517afc95b06",
  type: "page-type/movie",
  slug: "single-santa-seeks-mrs-claus",
  ownLength: 96,
  ownProgress: 0,
  partOfCollections: ["franchise/single-santa-seeks-mrs-claus"],
  position: 1,
  publishedAt: "2004-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "55739",
      externalLink: "https://www.themoviedb.org/movie/55739",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Single_Santa_Seeks_Mrs._Claus",
    },
  ],
  title: "Single Santa Seeks Mrs. Claus",
  genres: ["Comedy", "Fantasy", "Family", "TV Movie"],
  imdbId: "tt0413900",
  posterPath: "/vDluhxh8bGriK368p2G0rx32Yc6.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
