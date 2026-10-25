import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasWonderland = {
  id: "01a17499-e802-7002-8c05-bcc3f0d7d1bb",
  type: "page-type/movie",
  slug: "christmas-wonderland",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550032",
      externalLink: "https://www.themoviedb.org/movie/550032",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Wonderland",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9028856",
  posterPath: "/3QwvhdOZSNJdHbHcL9aIwp3l9mD.jpg",
  voteAverage: 5.998,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
