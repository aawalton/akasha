import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const soloLeveling = {
  id: "01a06802-9332-7024-9e9e-92e3d89e77c3",
  type: "page-type/show",
  slug: "solo-leveling",
  title: "Solo Leveling",
  partOfCollections: ["show-collection/anime-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "B",
  publishedAt: "2024-01-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "solo-leveling",
      externalLink: "https://trakt.tv/shows/solo-leveling",
      lastSyncedAt: "2025-12-24",
    },
  ],
} as const satisfies Show
