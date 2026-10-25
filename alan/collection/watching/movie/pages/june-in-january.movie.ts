import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const juneInJanuary = {
  id: "01a17499-8946-76b2-bd0e-5146ac0798a8",
  type: "page-type/movie",
  slug: "june-in-january",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "256599",
      externalLink: "https://www.themoviedb.org/movie/256599",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "June in January",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt3354866",
  posterPath: "/oEGvQJ3hcJLyTNqU7szvxCelukP.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
