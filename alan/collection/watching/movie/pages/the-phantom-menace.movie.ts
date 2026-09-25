import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePhantomMenace = {
  id: "01a06802-6d9a-701c-b11d-a9128b154673",
  type: "page-type/movie",
  slug: "the-phantom-menace",
  title: "The Phantom Menace",
  partOfCollections: ["fandom/star-wars-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1999-05-19",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-wars-episode-i-the-phantom-menace-1999",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
