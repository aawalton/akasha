import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const summerOfDreams = {
  id: "01a17499-a7d7-7021-b6da-0101ac3ce30f",
  type: "page-type/movie",
  slug: "summer-of-dreams",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/summer-of-dreams"],
  position: 1,
  publishedAt: "2016-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "411082",
      externalLink: "https://www.themoviedb.org/movie/411082",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Summer of Dreams",
  genres: ["TV Movie", "Drama", "Family"],
  imdbId: "tt6008686",
  posterPath: "/g8so49MHNdecx7cwfqTFo718VxK.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
