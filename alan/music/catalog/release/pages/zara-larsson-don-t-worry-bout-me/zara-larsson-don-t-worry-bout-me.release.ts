import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonDonTWorryBoutMe = {
  id: "01a0676a-d71c-7026-95f1-d8cfc00aa730",
  type: "page-type/release",
  slug: "zara-larsson-don-t-worry-bout-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2019-03-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45NYaXdS8H4pSXRDLnp7p5",
      externalLink: "https://open.spotify.com/album/45NYaXdS8H4pSXRDLnp7p5",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Don't Worry Bout Me",
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
