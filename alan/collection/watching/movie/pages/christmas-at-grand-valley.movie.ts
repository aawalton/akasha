import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtGrandValley = {
  id: "01a17499-e801-793c-893e-340cac0027c2",
  type: "page-type/movie",
  slug: "christmas-at-grand-valley",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550024",
      externalLink: "https://www.themoviedb.org/movie/550024",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Grand Valley",
  genres: ["TV Movie", "Family", "Romance"],
  imdbId: "tt9028784",
  posterPath: "/R8O6BlBD2J8N0Z5EI6fjuWQTDS.jpg",
  voteAverage: 6.383,
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
