import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSantaTellMe = {
  id: "01a0676a-d728-703e-a068-16df662e4b97",
  type: "page-type/release",
  slug: "ariana-grande-santa-tell-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2014-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27MNgBEnLCKoafz1g2Zu97",
      externalLink: "https://open.spotify.com/album/27MNgBEnLCKoafz1g2Zu97",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Santa Tell Me",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
