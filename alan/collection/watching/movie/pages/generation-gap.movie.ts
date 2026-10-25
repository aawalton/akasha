import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const generationGap = {
  id: "01a17499-470c-7f74-b70a-cd9e3e5d93bb",
  type: "page-type/movie",
  slug: "generation-gap",
  ownLength: 95,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286201",
      externalLink: "https://www.themoviedb.org/movie/286201",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Generation Gap",
  genres: ["TV Movie", "Drama", "Family"],
  imdbId: "tt1227777",
  posterPath: "/uybKtkFEqWCNnTOeIllkvmyFhFb.jpg",
  voteAverage: 7.2,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
