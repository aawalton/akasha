import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterFastTimes = {
  id: "01a0676a-d71d-7065-9e0c-386fc3425857",
  type: "page-type/release",
  slug: "sabrina-carpenter-fast-times",
  title: "Fast Times",
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  ownLength: 2.908983,
  ownProgress: 2.908983,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-02-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2rR0wpBcmvYpxQd77BWShd",
      externalLink: "https://open.spotify.com/album/2rR0wpBcmvYpxQd77BWShd",
      lastSyncedAt: "2025-12-24",
    },
  ],
} as const satisfies Release
