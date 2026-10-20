import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaAudioCidRemix = {
  id: "01a0676a-d717-703f-958d-5ee705b90b2c",
  type: "page-type/release",
  slug: "sia-audio-cid-remix",
  title: "Audio (CID Remix)",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-06-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1BuWvOi9Z2Tmgv9eQdooR6",
      externalLink: "https://open.spotify.com/album/1BuWvOi9Z2Tmgv9eQdooR6",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
