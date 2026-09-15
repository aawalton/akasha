import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheVeryBestOfEnyaDeluxeEditionTheRiverSings = {
  id: "01a0a5b0-28ca-7067-b90a-075db582e622",
  type: "page-type/track",
  slug: "enya-the-very-best-of-enya-deluxe-edition-the-river-sings",
  ownLength: 2.8359833333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-very-best-of-enya-deluxe-edition"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "38ftoLLPKVKu487etVkwW5",
      externalLink: "https://open.spotify.com/track/38ftoLLPKVKu487etVkwW5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The River Sings",
} as const satisfies Track
