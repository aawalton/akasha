import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const captainAmericaBraveNewWorld = {
  id: "01a06802-6d98-701c-9024-26e6a2fc2bed",
  type: "page-type/movie",
  slug: "captain-america-brave-new-world",
  title: "Captain America: Brave New World",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 54,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-02-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/captain-america-brave-new-world-2025",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
