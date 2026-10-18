import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonInvincible = {
  id: "01a0676a-d721-707d-87f1-633d1c09f26c",
  type: "page-type/release",
  slug: "kelly-clarkson-invincible",
  title: "Invincible",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-02-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3GuMnhTwoYNFURGVt4f57S",
      externalLink: "https://open.spotify.com/album/3GuMnhTwoYNFURGVt4f57S",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
