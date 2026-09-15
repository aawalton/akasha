import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiCaptainPlatonic = {
  id: "01a0676a-d719-7061-99f3-8359ecfd8e7c",
  type: "page-type/release",
  slug: "vinny-marchi-captain-platonic",
  title: "Captain Platonic",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 2.0246,
  ownProgress: 2.0246,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2024-04-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1HdUo2uDUswu1SG7Q4U1jc",
      externalLink: "https://open.spotify.com/album/1HdUo2uDUswu1SG7Q4U1jc",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
