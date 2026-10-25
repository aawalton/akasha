import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const familyPlan = {
  id: "01a17497-3825-771e-b430-55cfea6ee35f",
  type: "page-type/movie",
  slug: "family-plan",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "169492",
      externalLink: "https://www.themoviedb.org/movie/169492",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Family_Plan_(2005_film)" },
  ],
  title: "Family Plan",
  genres: ["Comedy", "TV Movie"],
  imdbId: "tt0433562",
  posterPath: "/9RG8kJ2pJTZcdZNcOnTcWLybImX.jpg",
  voteAverage: 6.1,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
