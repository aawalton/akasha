import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeYoursTruly = {
  id: "01a0676a-d732-7027-bfb0-f580527828a4",
  type: "page-type/release",
  slug: "ariana-grande-yours-truly",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2013-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5xSvNPstcxHtR4ap2vvN8A",
      externalLink: "https://open.spotify.com/album/5xSvNPstcxHtR4ap2vvN8A",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Yours Truly",
} as const satisfies Release
