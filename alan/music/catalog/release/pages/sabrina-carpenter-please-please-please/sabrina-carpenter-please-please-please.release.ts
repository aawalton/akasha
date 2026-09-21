import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePlease = {
  id: "01a0676a-d726-7084-95f1-80f990c7a736",
  type: "page-type/release",
  slug: "sabrina-carpenter-please-please-please",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2024-06-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5bBaoign62r1i7OV8w7mi9",
      externalLink: "https://open.spotify.com/album/5bBaoign62r1i7OV8w7mi9",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Please Please Please",
} as const satisfies Release
