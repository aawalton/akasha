import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNannyExpress = {
  id: "01a17499-470f-7a2a-adcf-9a196fd7dfeb",
  type: "page-type/movie",
  slug: "the-nanny-express",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "43735",
      externalLink: "https://www.themoviedb.org/movie/43735",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Nanny_Express" },
  ],
  title: "The Nanny Express",
  genres: ["Drama", "Romance", "Family", "Comedy", "TV Movie"],
  imdbId: "tt1282142",
  posterPath: "/jxzR92vsqUBcBaYKpxE397i0Da7.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "streaming-service/pixl",
    "streaming-service/up-faith-and-family",
    "streaming-service/xumo-play",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
