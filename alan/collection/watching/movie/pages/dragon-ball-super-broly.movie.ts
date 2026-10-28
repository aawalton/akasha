import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dragonBallSuperBroly = {
  id: "01a183dc-b156-75b9-b1da-a8349eaaae89",
  type: "page-type/movie",
  slug: "dragon-ball-super-broly",
  ownLength: 101,
  ownProgress: 0,
  partOfCollections: ["fandom/dragon-ball"],
  publishedAt: "2018-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "503314",
      externalLink: "https://www.themoviedb.org/movie/503314",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Dragon Ball Super: Broly",
  streamingOn: ["Crunchyroll", "Crunchyroll Amazon Channel", "Hulu"],
  createdAt: "2026-10-28T18:54:01.045Z",
  updatedAt: "2026-10-28T19:46:53.289Z",
} as const satisfies Movie
