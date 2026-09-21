import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiRidingWaves = {
  id: "01a0676a-d728-7007-aca9-2c1441ba906c",
  type: "page-type/release",
  slug: "vinny-marchi-riding-waves",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-11-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25HximsuHWvp7i3HGwqd7u",
      externalLink: "https://open.spotify.com/album/25HximsuHWvp7i3HGwqd7u",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Riding Waves",
} as const satisfies Release
