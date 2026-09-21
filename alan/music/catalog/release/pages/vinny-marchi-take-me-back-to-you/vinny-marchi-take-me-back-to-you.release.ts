import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTakeMeBackToYou = {
  id: "01a0676a-d72b-7013-8add-e71c1cbf38c0",
  type: "page-type/release",
  slug: "vinny-marchi-take-me-back-to-you",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-12-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5qISoGQuqwNr32IFk4y7ZK",
      externalLink: "https://open.spotify.com/album/5qISoGQuqwNr32IFk4y7ZK",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Take Me Back To You",
} as const satisfies Release
