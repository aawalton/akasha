import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chainsawManTheMovieRezeArc = {
  id: "01a183d5-2fa9-7318-a652-3fa3767e2073",
  type: "page-type/movie",
  slug: "chainsaw-man-the-movie-reze-arc",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["fandom/chainsaw-man"],
  publishedAt: "2025-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1218925",
      externalLink: "https://www.themoviedb.org/movie/1218925",
    },
  ],
  title: "Chainsaw Man - The Movie: Reze Arc",
  createdAt: "2026-10-28T18:45:49.097Z",
  updatedAt: "2026-10-28T18:45:49.097Z",
} as const satisfies Movie
