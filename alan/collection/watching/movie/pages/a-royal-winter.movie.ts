import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalWinter = {
  id: "01a17499-a7d3-7e24-bf28-55533cfb2cf0",
  type: "page-type/movie",
  slug: "a-royal-winter",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "435107",
      externalLink: "https://www.themoviedb.org/movie/435107",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Royal Winter",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt6387232",
  posterPath: "/qhflgkO1GHPKneXxbTSGEXgqGig.jpg",
  voteAverage: 7.117,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
