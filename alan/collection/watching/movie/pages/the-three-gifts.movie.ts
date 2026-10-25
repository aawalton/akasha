import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theThreeGifts = {
  id: "01a17499-470f-747d-9269-487f9efb5d22",
  type: "page-type/movie",
  slug: "the-three-gifts",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113893",
      externalLink: "https://www.themoviedb.org/movie/113893",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Three Gifts",
  genres: ["TV Movie", "Family", "Drama"],
  imdbId: "tt1542767",
  posterPath: "/b1lY09CedAIkzG2x5z8KzJ6r51e.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
