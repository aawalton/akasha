import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rubyHerringMysteriesHerLastBreath = {
  id: "01a1749a-06bf-718b-8bc4-7ff3a5609601",
  type: "page-type/movie",
  slug: "ruby-herring-mysteries-her-last-breath",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/ruby-herring-mysteries"],
  position: 2,
  publishedAt: "2019-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "620741",
      externalLink: "https://www.themoviedb.org/movie/620741",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ruby Herring Mysteries: Her Last Breath",
  genres: ["TV Movie", "Mystery", "Thriller", "Crime"],
  imdbId: "tt10709062",
  posterPath: "/kEj8yQRLm4FJgZRtEUG418Zwq6G.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
