import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayThatSRockNRoll = {
  id: "01a0676a-d72c-701a-afb7-6c0aa4ea6c2c",
  type: "page-type/release",
  slug: "green-day-that-s-rock-n-roll",
  title: "That's Rock 'n' Roll",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 2.990583,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "C",
  publishedAt: "2020-10-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JSuv6toFloxZTqxH2g68L",
      externalLink: "https://open.spotify.com/album/3JSuv6toFloxZTqxH2g68L",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
