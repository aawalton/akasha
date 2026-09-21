import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterShortNSweet = {
  id: "01a0676a-d728-7076-a1a1-a625cb4fd82e",
  type: "page-type/release",
  slug: "sabrina-carpenter-short-n-sweet",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2024-08-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3iPSVi54hsacKKl1xIR2eH",
      externalLink: "https://open.spotify.com/album/3iPSVi54hsacKKl1xIR2eH",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Short n' Sweet",
} as const satisfies Release
