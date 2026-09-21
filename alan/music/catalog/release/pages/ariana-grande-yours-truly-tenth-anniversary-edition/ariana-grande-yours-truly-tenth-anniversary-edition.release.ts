import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEdition = {
  id: "01a0676a-d732-7028-af23-b23d0ab534f1",
  type: "page-type/release",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2023-08-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VSBGJ8bUuNgmOYXHIQagM",
      externalLink: "https://open.spotify.com/album/2VSBGJ8bUuNgmOYXHIQagM",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Yours Truly (Tenth Anniversary Edition)",
} as const satisfies Release
