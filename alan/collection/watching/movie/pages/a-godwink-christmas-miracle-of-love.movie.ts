import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGodwinkChristmasMiracleOfLove = {
  id: "01a1749a-4648-7b74-ba4c-09dfac3e2345",
  type: "page-type/movie",
  slug: "a-godwink-christmas-miracle-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/a-godwink-christmas"],
  position: 4,
  publishedAt: "2021-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "888506",
      externalLink: "https://www.themoviedb.org/movie/888506",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Godwink Christmas: Miracle of Love",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt16047114",
  posterPath: "/xUkhzklFW3p5m3cNVO5Mqb7n5B3.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
