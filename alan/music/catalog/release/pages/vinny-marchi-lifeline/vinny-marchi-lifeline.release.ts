import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiLifeline = {
  id: "01a0676a-d723-702b-923b-374dcc368f4d",
  type: "page-type/release",
  slug: "vinny-marchi-lifeline",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-02-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1PfV8DV6jaoR7sXmtaX8wS",
      externalLink: "https://open.spotify.com/album/1PfV8DV6jaoR7sXmtaX8wS",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "LIFELINE",
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
