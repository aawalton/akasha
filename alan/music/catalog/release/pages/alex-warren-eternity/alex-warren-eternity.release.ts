import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenEternity = {
  id: "01a0676a-d71d-702a-854b-2a062344364c",
  type: "release",
  slug: "alex-warren-eternity",
  title: "Eternity",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 3.391233,
  ownProgress: 3.391233,
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
} as const satisfies Release
