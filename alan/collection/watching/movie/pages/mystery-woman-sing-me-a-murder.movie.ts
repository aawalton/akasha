import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanSingMeAMurder = {
  id: "01a17497-3829-715f-a9b4-f94760939952",
  type: "page-type/movie",
  slug: "mystery-woman-sing-me-a-murder",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 3,
  publishedAt: "2005-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "197328",
      externalLink: "https://www.themoviedb.org/movie/197328",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: Sing Me a Murder",
  genres: ["Mystery", "Crime", "TV Movie", "Thriller"],
  imdbId: "tt0433604",
  posterPath: "/azbEhj4Ln5F9I45vpyzE18QSi5A.jpg",
  voteAverage: 5.8,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
