import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const cloakAndDagger = {
  id: "01a06802-9331-7011-8e99-155246c47b6e",
  type: "page-type/show",
  slug: "cloak-and-dagger",
  title: "Cloak & Dagger",
  partOfCollections: ["fandom/marvel-television"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-06-08",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-cloak-dagger",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
