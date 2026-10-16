import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenEternity = {
  id: "01a0676a-d71d-702a-854b-2a062344364c",
  type: "page-type/release",
  slug: "alex-warren-eternity",
  title: "Eternity",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-12-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1arG3K4COe0kCEU9NqPF5S",
      externalLink: "https://open.spotify.com/album/1arG3K4COe0kCEU9NqPF5S",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
