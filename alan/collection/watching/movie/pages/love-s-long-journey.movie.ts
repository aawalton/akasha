import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSLongJourney = {
  id: "01a17497-3827-7df8-8c5c-a2ea49d7dac1",
  type: "page-type/movie",
  slug: "love-s-long-journey",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "20583",
      externalLink: "https://www.themoviedb.org/movie/20583",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love's_Long_Journey" },
  ],
  title: "Love's Long Journey",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt0486420",
  posterPath: "/bYPJFCO5h2Cd46ObIqeuelNX8EW.jpg",
  voteAverage: 7,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
