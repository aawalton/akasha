import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const takingAChanceOnLove = {
  id: "01a17499-470e-77c5-a415-4ea4a16a550a",
  type: "page-type/movie",
  slug: "taking-a-chance-on-love",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["franchise/the-note"],
  position: 2,
  publishedAt: "2009-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "20320",
      externalLink: "https://www.themoviedb.org/movie/20320",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Taking_a_Chance_on_Love_(film)",
    },
  ],
  title: "Taking a Chance on Love",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt1327812",
  posterPath: "/4sI90fNDrGxrXRXwzAFAatgjIPt.jpg",
  voteAverage: 4.7,
  streamingOn: ["Amazon Prime Video", "Amazon Prime Video with Ads", "Tubi TV"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
