import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSChristmasJourney = {
  id: "01a17499-66a0-7f55-a460-e61aee46a62b",
  type: "page-type/movie",
  slug: "love-s-christmas-journey",
  ownLength: 172,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87313",
      externalLink: "https://www.themoviedb.org/movie/87313",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love's_Christmas_Journey" },
  ],
  title: "Love's Christmas Journey",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt2078672",
  posterPath: "/jYqWZG3f5FRy8oUwZYOn77h9I59.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
