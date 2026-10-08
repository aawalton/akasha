import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiIHeardMrRamone = {
  id: "01a0676a-d721-7021-a1b2-9b94d2b27f62",
  type: "page-type/release",
  slug: "vinny-marchi-i-heard-mr-ramone",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2025-11-07",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ix4z15jxuaZB0Cp0raMw2",
      externalLink: "https://open.spotify.com/album/2ix4z15jxuaZB0Cp0raMw2",
      lastSyncedAt: "2025-11-23",
    },
  ],
  title: "I Heard Mr. Ramone",
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
