import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTrueLove = {
  id: "01a0676a-d72f-701f-a15b-ecba85a7facf",
  type: "page-type/release",
  slug: "coldplay-true-love",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-08-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WBIRgdTtnf2cYfoSHSLEb",
      externalLink: "https://open.spotify.com/album/5WBIRgdTtnf2cYfoSHSLEb",
    },
  ],
  title: "True Love",
} as const satisfies Release
