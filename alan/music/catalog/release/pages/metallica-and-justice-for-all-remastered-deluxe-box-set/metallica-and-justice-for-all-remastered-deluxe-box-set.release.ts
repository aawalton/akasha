import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaAndJusticeForAllRemasteredDeluxeBoxSet = {
  id: "01a0676a-d717-7017-a0e6-5439ca1a4a60",
  type: "page-type/release",
  slug: "metallica-and-justice-for-all-remastered-deluxe-box-set",
  title: "...And Justice for All (Remastered Deluxe Box Set)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 788.81305,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1988-09-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2XbWaerVk9fjhEiGSrd6TF",
      externalLink: "https://open.spotify.com/album/2XbWaerVk9fjhEiGSrd6TF",
    },
  ],
} as const satisfies Release
