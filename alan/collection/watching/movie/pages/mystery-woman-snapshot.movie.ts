import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanSnapshot = {
  id: "01a17497-3829-74da-beea-8d741d91e1cc",
  type: "page-type/movie",
  slug: "mystery-woman-snapshot",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 2,
  publishedAt: "2005-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "114695",
      externalLink: "https://www.themoviedb.org/movie/114695",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: Snapshot",
  genres: ["Mystery", "Thriller", "Crime", "TV Movie"],
  imdbId: "tt0427575",
  posterPath: "/mipCytt4EaTp861oKFOAHMAwqEv.jpg",
  voteAverage: 6.7,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
