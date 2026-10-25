import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInRome = {
  id: "01a1749a-06ba-7173-90d0-c2b23f740527",
  type: "page-type/movie",
  slug: "christmas-in-rome",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626315",
      externalLink: "https://www.themoviedb.org/movie/626315",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Rome",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt10344956",
  posterPath: "/q5QaNyeS5TA7F0v4oTv652XGUUc.jpg",
  voteAverage: 6.62,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
