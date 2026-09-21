import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeYesAndFelixJaehnRemix = {
  id: "01a0676a-d731-704d-8c02-bf64c1e473ac",
  type: "page-type/release",
  slug: "ariana-grande-yes-and-felix-jaehn-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1K9Kpjfdj7Y3MHxuq3M6TK",
      externalLink: "https://open.spotify.com/album/1K9Kpjfdj7Y3MHxuq3M6TK",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "yes, and? (Felix Jaehn Remix)",
} as const satisfies Release
