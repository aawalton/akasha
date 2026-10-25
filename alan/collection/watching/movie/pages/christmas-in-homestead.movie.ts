import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInHomestead = {
  id: "01a17499-a7d3-79bd-bd3a-7ca5e1625823",
  type: "page-type/movie",
  slug: "christmas-in-homestead",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421620",
      externalLink: "https://www.themoviedb.org/movie/421620",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Homestead",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6273004",
  posterPath: "/f8kzIaRuMHrDuFzjbpIgPhbecNi.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
