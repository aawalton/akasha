import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const eatPlayLove = {
  id: "01a17499-a7d4-7e18-ab6b-a2eb55689c36",
  type: "page-type/movie",
  slug: "eat-play-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-08-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "471608",
      externalLink: "https://www.themoviedb.org/movie/471608",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Eat, Play, Love",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt7034316",
  posterPath: "/kdDlx7ACjdvjOgM5mDyy7C2yBEH.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
