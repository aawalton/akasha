import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const frozenInLove = {
  id: "01a17499-c95c-7e1d-b42d-61e522aa6c03",
  type: "page-type/movie",
  slug: "frozen-in-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "491408",
      externalLink: "https://www.themoviedb.org/movie/491408",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Frozen_in_Love" },
  ],
  title: "Frozen in Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7756492",
  posterPath: "/iF7hEneMVFET1XebgmMqfTLaM6r.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
