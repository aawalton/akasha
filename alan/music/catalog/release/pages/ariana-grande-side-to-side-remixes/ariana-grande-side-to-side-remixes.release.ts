import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSideToSideRemixes = {
  id: "01a0676a-d729-7001-bc2c-b388752da592",
  type: "page-type/release",
  slug: "ariana-grande-side-to-side-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2017-02-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6I3a9Dp8ZrsVWhbQja7xBz",
      externalLink: "https://open.spotify.com/album/6I3a9Dp8ZrsVWhbQja7xBz",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Side To Side (Remixes)",
} as const satisfies Release
