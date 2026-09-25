import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const guardiansOfTheGalaxy = {
  id: "01a06802-6d99-7012-8010-1ee2341fde0f",
  type: "page-type/movie",
  slug: "guardians-of-the-galaxy",
  title: "Guardians of the Galaxy",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-08-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/guardians-of-the-galaxy-2014",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
