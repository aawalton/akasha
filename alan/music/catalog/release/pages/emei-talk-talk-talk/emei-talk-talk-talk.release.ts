import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiTalkTalkTalk = {
  id: "01a0c43e-721a-7027-95e7-cf5a4f87efc0",
  type: "page-type/release",
  slug: "emei-talk-talk-talk",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2025-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4w7lV4bRkdPxEfkv3CGEbo",
      externalLink: "https://open.spotify.com/album/4w7lV4bRkdPxEfkv3CGEbo",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Talk Talk Talk",
  createdAt: "2026-09-21T13:53:41.914Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
