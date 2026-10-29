import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const escapeFromTheBloodkeep = {
  id: "01a06802-b8b9-703b-a622-78a431132f08",
  type: "page-type/season",
  slug: "escape-from-the-bloodkeep",
  title: "Escape From The Bloodkeep",
  partOfCollections: ["show/dimension-20"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-04-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-194724",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
