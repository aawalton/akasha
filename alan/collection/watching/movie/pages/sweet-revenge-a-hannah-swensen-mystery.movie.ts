import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sweetRevengeAHannahSwensenMystery = {
  id: "01a1749a-464d-7b29-addb-5604da575a4e",
  type: "page-type/movie",
  slug: "sweet-revenge-a-hannah-swensen-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 6,
  publishedAt: "2021-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "840382",
      externalLink: "https://www.themoviedb.org/movie/840382",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sweet Revenge: A Hannah Swensen Mystery",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt14617098",
  posterPath: "/26QfVdLQ6hYEwvrnhdJChQUgJJ8.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
