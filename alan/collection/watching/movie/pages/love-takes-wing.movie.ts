import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveTakesWing = {
  id: "01a17499-470d-711d-89a3-f67a1c11dc3c",
  type: "page-type/movie",
  slug: "love-takes-wing",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21636",
      externalLink: "https://www.themoviedb.org/movie/21636",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love_Takes_Wing" },
  ],
  title: "Love Takes Wing",
  genres: ["Drama", "Western", "Family", "Romance"],
  imdbId: "tt1269560",
  posterPath: "/b6bM8dmSbEHDv9hHIJCZjbgIkbV.jpg",
  voteAverage: 7,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
