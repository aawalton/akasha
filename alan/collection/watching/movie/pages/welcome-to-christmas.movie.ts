import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const welcomeToChristmas = {
  id: "01a17499-e806-7310-824c-a0ed558f0a40",
  type: "page-type/movie",
  slug: "welcome-to-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550075",
      externalLink: "https://www.themoviedb.org/movie/550075",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Welcome to Christmas",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt9033308",
  posterPath: "/mAkk1n0ilXwF1GIN87iNyygl77Z.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
