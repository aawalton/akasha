import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fixingPete = {
  id: "01a17499-669e-7d9c-aefe-76a43e1ae8f3",
  type: "page-type/movie",
  slug: "fixing-pete",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "227552",
      externalLink: "https://www.themoviedb.org/movie/227552",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fixing Pete",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt1737586",
  posterPath: "/m4mYaiOZwJhmK3HZiQRLZf265E7.jpg",
  voteAverage: 5.1,
  streamingOn: ["PixL Amazon Channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
