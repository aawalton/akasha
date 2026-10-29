import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const soloLeveling = {
  id: "01a06802-9332-7024-9e9e-92e3d89e77c3",
  type: "page-type/show",
  slug: "solo-leveling",
  title: "Solo Leveling",
  streamingOn: ["streaming-service/crunchyroll"],
  partOfCollections: ["show-collection/anime-shows", "fandom/solo-leveling"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-01-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "solo-leveling",
      externalLink: "https://trakt.tv/shows/solo-leveling",
      lastSyncedAt: "2025-12-24",
    },
    {
      source: "tmdb",
      externalId: "127532",
      externalLink: "https://www.themoviedb.org/tv/127532",
      lastSyncedAt: "2026-10-29",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T14:34:42.668Z",
  completedAt: "2026-10-29",
} as const satisfies Show
