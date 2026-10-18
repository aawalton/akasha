import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonInvincibleRemixes = {
  id: "01a0676a-d721-7080-b2b8-9c972891306d",
  type: "page-type/release",
  slug: "kelly-clarkson-invincible-remixes",
  title: "Invincible (Remixes)",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-06-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zNmdih2C1NoVO8nvSvj3z",
      externalLink: "https://open.spotify.com/album/5zNmdih2C1NoVO8nvSvj3z",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
