import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theConfession = {
  id: "01a17499-66a2-77a6-988d-7ef4ab45c708",
  type: "page-type/movie",
  slug: "the-confession",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "201350",
      externalLink: "https://www.themoviedb.org/movie/201350",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Confession",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt2317171",
  posterPath: "/8nCtqIXALBI232Yf9eNHCKGGPWK.jpg",
  voteAverage: 6.6,
  streamingOn: ["Pluto TV", "Runtime"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
