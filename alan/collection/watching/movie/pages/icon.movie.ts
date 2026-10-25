import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const icon = {
  id: "01a17497-3826-71cf-bf0d-02cff595edc2",
  type: "page-type/movie",
  slug: "icon",
  ownLength: 166,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-05-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37661",
      externalLink: "https://www.themoviedb.org/movie/37661",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Icon_(film)" },
  ],
  title: "Icon",
  genres: ["TV Movie", "Action", "Drama", "Thriller"],
  imdbId: "tt0424176",
  posterPath: "/wfveTRLNU4Dm0nmIVTul2oRVEBh.jpg",
  voteAverage: 5.5,
  streamingOn: ["fuboTV"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
