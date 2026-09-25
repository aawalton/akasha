import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const attackOfTheClones = {
  id: "01a06802-6d98-7008-b6d6-f18e7c93f5d0",
  type: "page-type/movie",
  slug: "attack-of-the-clones",
  title: "Attack of the Clones",
  partOfCollections: ["fandom/star-wars-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2002-05-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-wars-episode-ii-attack-of-the-clones-2002",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
