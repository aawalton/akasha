import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiBadDaysGood = {
  id: "01a0676a-d718-7007-b378-f762c22f10bc",
  type: "page-type/release",
  slug: "vinny-marchi-bad-days-good",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-11-03",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "72Ke546DycQRO62YsOJ6cZ",
      externalLink: "https://open.spotify.com/album/72Ke546DycQRO62YsOJ6cZ",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Bad Days Good",
} as const satisfies Release
