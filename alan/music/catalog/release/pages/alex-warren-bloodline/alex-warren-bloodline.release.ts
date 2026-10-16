import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenBloodline = {
  id: "01a0676a-d719-7019-ae18-e95a2361ad0a",
  type: "page-type/release",
  slug: "alex-warren-bloodline",
  title: "Bloodline",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-05-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2KoAn4MyptQWG1qBx7mu01",
      externalLink: "https://open.spotify.com/album/2KoAn4MyptQWG1qBx7mu01",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
