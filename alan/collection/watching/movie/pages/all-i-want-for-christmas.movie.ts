import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allIWantForChristmas = {
  id: "01a17497-3824-78cf-a255-372bdab6f9e1",
  type: "page-type/movie",
  slug: "all-i-want-for-christmas",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2007-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "144097",
      externalLink: "https://www.themoviedb.org/movie/144097",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All I Want for Christmas",
  genres: ["TV Movie", "Romance", "Drama", "Family"],
  imdbId: "tt1112097",
  posterPath: "/r4hSrTPrVSBG7GLJCXL1t18tJRU.jpg",
  voteAverage: 5.6,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
