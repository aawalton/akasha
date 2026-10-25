import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mystery101 = {
  id: "01a1749a-06be-7647-a005-b0f5e11d6b3d",
  type: "page-type/movie",
  slug: "mystery-101",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-101"],
  position: 0,
  publishedAt: "2019-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "577091",
      externalLink: "https://www.themoviedb.org/movie/577091",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101",
  genres: ["Crime", "Mystery", "TV Movie"],
  imdbId: "tt9679608",
  posterPath: "/uC8yqYQsylFEqB2OGDIGmspBw2i.jpg",
  voteAverage: 7.231,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
