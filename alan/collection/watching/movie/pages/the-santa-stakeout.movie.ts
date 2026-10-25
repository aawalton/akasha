import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSantaStakeout = {
  id: "01a1749a-259e-73ea-b1e9-a8e63067ee3f",
  type: "page-type/movie",
  slug: "the-santa-stakeout",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874238",
      externalLink: "https://www.themoviedb.org/movie/874238",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Santa Stakeout",
  genres: ["TV Movie", "Comedy", "Romance", "Crime"],
  imdbId: "tt15737510",
  posterPath: "/g7H4cvUmGC4dQ60ViOrELatrrFW.jpg",
  voteAverage: 6.109,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
