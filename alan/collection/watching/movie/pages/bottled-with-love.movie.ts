import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bottledWithLove = {
  id: "01a17499-e801-78de-b928-1690552d7fac",
  type: "page-type/movie",
  slug: "bottled-with-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "586654",
      externalLink: "https://www.themoviedb.org/movie/586654",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Bottled with Love",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9876408",
  posterPath: "/33fr9BSvkJ6K5OvGIK2jnraXxlE.jpg",
  voteAverage: 6.808,
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
