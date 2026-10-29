import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const piratesOfLeviathan = {
  id: "01a06802-b8bc-7019-8624-71139c8e348c",
  type: "page-type/season",
  slug: "pirates-of-leviathan",
  title: "Pirates of Leviathan",
  partOfCollections: ["show/dimension-20"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-09-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-228898",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
