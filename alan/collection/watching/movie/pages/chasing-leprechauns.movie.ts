import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chasingLeprechauns = {
  id: "01a17499-669d-784b-83ab-c82f0fec697d",
  type: "page-type/movie",
  slug: "chasing-leprechauns",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2012-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "109752",
      externalLink: "https://www.themoviedb.org/movie/109752",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chasing Leprechauns",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt1871241",
  posterPath: "/4VdAEpf5KGa7B6vX0ITpeSxfWAo.jpg",
  voteAverage: 6,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
