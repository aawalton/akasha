import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTakeTheReins = {
  id: "01a0676a-d72b-701a-ac12-98750c510c5c",
  type: "page-type/release",
  slug: "vinny-marchi-take-the-reins",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-08-16",
  grade: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23plU4MihkdBEMytjZcePW",
      externalLink: "https://open.spotify.com/album/23plU4MihkdBEMytjZcePW",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Take The Reins",
} as const satisfies Release
