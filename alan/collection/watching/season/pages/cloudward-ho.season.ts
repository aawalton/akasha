import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cloudwardHo = {
  id: "01a06802-b8b8-702f-896d-c9af684ac7ec",
  type: "page-type/season",
  slug: "cloudward-ho",
  title: "Cloudward, Ho!",
  partOfCollections: ["show/dimension-20"],
  position: 26,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-06-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-459045",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/26",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
