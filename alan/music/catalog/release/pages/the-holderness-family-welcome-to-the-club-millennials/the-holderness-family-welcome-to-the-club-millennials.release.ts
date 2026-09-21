import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyWelcomeToTheClubMillennials = {
  id: "01a0676a-d730-703d-a6b7-38669d64ebc2",
  type: "page-type/release",
  slug: "the-holderness-family-welcome-to-the-club-millennials",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2023-04-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "17RHu5RX4zG6gzMfM5Huve",
      externalLink: "https://open.spotify.com/album/17RHu5RX4zG6gzMfM5Huve",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Welcome to the Club, Millennials",
} as const satisfies Release
