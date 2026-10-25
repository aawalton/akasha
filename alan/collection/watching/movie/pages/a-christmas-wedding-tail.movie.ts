import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasWeddingTail = {
  id: "01a17499-669c-755e-8697-dab60df19c69",
  type: "page-type/movie",
  slug: "a-christmas-wedding-tail",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "80301",
      externalLink: "https://www.themoviedb.org/movie/80301",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Wedding Tail",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt2024354",
  posterPath: "/a5p020pc0ZFE71ia8KV2KDvacAr.jpg",
  voteAverage: 5,
  streamingOn: ["Lionsgate+ Amazon Channel", "Plex", "Plex Channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
