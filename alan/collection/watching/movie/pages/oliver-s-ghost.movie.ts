import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oliverSGhost = {
  id: "01a17499-66a0-7c9c-8b19-11f639930f42",
  type: "page-type/movie",
  slug: "oliver-s-ghost",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "217087",
      externalLink: "https://www.themoviedb.org/movie/217087",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Oliver's Ghost",
  genres: ["TV Movie", "Family"],
  imdbId: "tt1809318",
  posterPath: "/yqMENE9lWNg91WqhtA8jo5Yzd6Y.jpg",
  voteAverage: 6.4,
  streamingOn: ["PixL Amazon Channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
