import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const criticalRole = {
  id: "01a06802-9331-7015-96a3-52b48ac3d274",
  type: "page-type/show",
  slug: "critical-role",
  title: "Critical Role",
  partOfCollections: ["show-collection/dungeons-and-dragons-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-03-12",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/critical-role",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
