import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterBringYourLove = {
  id: "01a0b111-1af0-75d4-b6d0-fda97661ce12",
  type: "page-type/release",
  slug: "sabrina-carpenter-bring-your-love",
  ownLength: 3.6066666666666665,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2026-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "665pFCQBHwnaNPekEcz7mQ",
      externalLink: "https://open.spotify.com/album/665pFCQBHwnaNPekEcz7mQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bring Your Love",
} as const satisfies Release
