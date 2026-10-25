import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMystery = {
  id: "01a17499-669e-7c36-b92e-48f13366c871",
  type: "page-type/movie",
  slug: "garage-sale-mystery",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 0,
  publishedAt: "2013-09-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "221791",
      externalLink: "https://www.themoviedb.org/movie/221791",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery",
  genres: ["Crime", "Mystery", "TV Movie"],
  imdbId: "tt3106464",
  posterPath: "/AiPSRVR3tAsyWKmJnAyzbYC6u6C.jpg",
  voteAverage: 6.1,
  streamingOn: ["Plex", "Plex Channel", "fuboTV"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
