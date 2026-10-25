import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSantaIncident = {
  id: "01a17499-470f-7f72-a039-8a83d6939e8a",
  type: "page-type/movie",
  slug: "the-santa-incident",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2010-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112340",
      externalLink: "https://www.themoviedb.org/movie/112340",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Santa Incident",
  genres: ["Family", "Comedy", "TV Movie"],
  imdbId: "tt1761007",
  posterPath: "/8NdJyYXOJ1PuuPTIoOtuoJrUs8K.jpg",
  voteAverage: 4.6,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
