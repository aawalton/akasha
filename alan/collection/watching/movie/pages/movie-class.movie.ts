import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const movieClass = {
  id: "01a17499-470d-7c22-bb6c-90fea6ac748d",
  type: "page-type/movie",
  slug: "movie-class",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "259849",
      externalLink: "https://www.themoviedb.org/movie/259849",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Class",
  genres: ["Drama", "Romance"],
  imdbId: "tt1563711",
  posterPath: "/qHspGHYa2FxKfN3FhoHEm6YSQaj.jpg",
  voteAverage: 7.6,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
