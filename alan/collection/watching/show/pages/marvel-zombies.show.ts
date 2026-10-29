import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const marvelZombies = {
  id: "01a06802-9332-7009-bfe5-9d16dfa41801",
  type: "page-type/show",
  slug: "marvel-zombies",
  title: "Marvel Zombies",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 59,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-zombies",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "138505", externalLink: "https://www.themoviedb.org/tv/138505" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:32:14.686Z",
} as const satisfies Show
