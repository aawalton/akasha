import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const entertainingChristmas = {
  id: "01a17499-e802-7bc7-94a7-bc9e27418f8b",
  type: "page-type/movie",
  slug: "entertaining-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550034",
      externalLink: "https://www.themoviedb.org/movie/550034",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Entertaining Christmas",
  genres: ["TV Movie", "Romance", "Family"],
  imdbId: "tt9028872",
  posterPath: "/9XC1hug2bGP1d6kIKKSFILTdJzf.jpg",
  voteAverage: 6.1,
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
