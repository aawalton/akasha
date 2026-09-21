import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterWhyAcoustic = {
  id: "01a0676a-d731-7014-91fe-d9b6e71827b3",
  type: "page-type/release",
  slug: "sabrina-carpenter-why-acoustic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2017-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oAvhwkc4AwieC8QHaEgVi",
      externalLink: "https://open.spotify.com/album/3oAvhwkc4AwieC8QHaEgVi",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Why (Acoustic)",
} as const satisfies Release
