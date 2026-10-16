import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenOnMyMind = {
  id: "01a0676a-d726-7023-b2f4-c56488eec7ea",
  type: "page-type/release",
  slug: "alex-warren-on-my-mind",
  title: "On My Mind",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-06-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "128pqckLyL3mr3SJwpUZun",
      externalLink: "https://open.spotify.com/album/128pqckLyL3mr3SJwpUZun",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
