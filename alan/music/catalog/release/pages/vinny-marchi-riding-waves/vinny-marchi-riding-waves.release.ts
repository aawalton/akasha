import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiRidingWaves = {
  id: "01a0676a-d728-7007-aca9-2c1441ba906c",
  type: "release",
  slug: "vinny-marchi-riding-waves",
  title: "Riding Waves",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 2.811183,
  ownProgress: 2.811183,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-11-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25HximsuHWvp7i3HGwqd7u",
      externalLink: "https://open.spotify.com/album/25HximsuHWvp7i3HGwqd7u",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
