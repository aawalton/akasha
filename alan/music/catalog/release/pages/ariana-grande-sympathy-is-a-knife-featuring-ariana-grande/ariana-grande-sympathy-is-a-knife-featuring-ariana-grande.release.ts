import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSympathyIsAKnifeFeaturingArianaGrande = {
  id: "01a0676a-d72b-7008-a826-df4cf82f1c7a",
  type: "page-type/release",
  slug: "ariana-grande-sympathy-is-a-knife-featuring-ariana-grande",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-10-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0BL4n7JwPd0Ml4nhpjRCFv",
      externalLink: "https://open.spotify.com/album/0BL4n7JwPd0Ml4nhpjRCFv",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Sympathy is a knife featuring ariana grande",
} as const satisfies Release
