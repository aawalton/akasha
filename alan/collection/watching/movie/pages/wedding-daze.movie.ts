import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingDaze = {
  id: "01a17497-382b-787c-96f9-9718afb94680",
  type: "page-type/movie",
  slug: "wedding-daze",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "43666",
      externalLink: "https://www.themoviedb.org/movie/43666",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Wedding_Daze_(2004_film)" },
  ],
  title: "Wedding Daze",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt0418315",
  posterPath: "/ozgjmzP5BxVxdD9fDG7RHTjhMdx.jpg",
  voteAverage: 4.9,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
