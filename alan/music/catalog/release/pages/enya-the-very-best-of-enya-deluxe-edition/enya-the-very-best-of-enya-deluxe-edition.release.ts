import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaTheVeryBestOfEnyaDeluxeEdition = {
  id: "01a0676a-d72e-701b-a797-580b13c83186",
  type: "page-type/release",
  slug: "enya-the-very-best-of-enya-deluxe-edition",
  title: "The Very Best of Enya (Deluxe Edition)",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 84.055617,
  ownProgress: 84.055617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-12-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nWeQICT2mTRckahG3Wuus",
      externalLink: "https://open.spotify.com/album/6nWeQICT2mTRckahG3Wuus",
      lastSyncedAt: "2025-10-09",
    },
  ],
} as const satisfies Release
