import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hollyIvy = {
  id: "01a1749a-259b-7139-9a15-7fc691384fc1",
  type: "page-type/movie",
  slug: "holly-ivy",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737793",
      externalLink: "https://www.themoviedb.org/movie/737793",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holly & Ivy",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13356246",
  posterPath: "/2L5CqrFgHgt9RYtpkGT0Baz0Jp2.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
