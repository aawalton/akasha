import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveFindsAHome = {
  id: "01a17499-470d-7a3b-bb89-6731b696c03e",
  type: "page-type/movie",
  slug: "love-finds-a-home",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "25182",
      externalLink: "https://www.themoviedb.org/movie/25182",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love_Finds_a_Home" },
  ],
  title: "Love Finds a Home",
  genres: ["Drama", "Romance", "Western", "Family", "Action", "TV Movie"],
  imdbId: "tt1307064",
  posterPath: "/zgFi7OtOeMmvH3stWJSpazJGaSJ.jpg",
  voteAverage: 6.6,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
