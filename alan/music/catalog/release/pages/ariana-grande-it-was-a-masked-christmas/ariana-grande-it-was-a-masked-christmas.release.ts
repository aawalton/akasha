import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeItWasAMaskedChristmas = {
  id: "01a0676a-d722-7018-b274-7eb31efdcf4b",
  type: "page-type/release",
  slug: "ariana-grande-it-was-a-masked-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2021-12-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LsTjhsTKJA0Rfwwx1ppXs",
      externalLink: "https://open.spotify.com/album/7LsTjhsTKJA0Rfwwx1ppXs",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "It Was A… (Masked Christmas)",
} as const satisfies Release
