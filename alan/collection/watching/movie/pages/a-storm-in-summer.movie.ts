import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aStormInSummer = {
  id: "01a17497-195c-7128-a7bf-c5e75c2fa939",
  type: "page-type/movie",
  slug: "a-storm-in-summer",
  ownLength: 94,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2000-02-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "164123",
      externalLink: "https://www.themoviedb.org/movie/164123",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Storm_in_Summer" },
  ],
  title: "A Storm in Summer",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0217066",
  posterPath: "/cWAeyPHwFqLF2uJ1fldftQUd7d6.jpg",
  voteAverage: 6.4,
  streamingOn: ["Cineverse"],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
