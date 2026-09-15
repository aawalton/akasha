import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTrueLove = {
  id: "01a0676a-d72f-701f-a15b-ecba85a7facf",
  type: "release",
  slug: "coldplay-true-love",
  title: "True Love",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 4.1,
  ownProgress: 4.1,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-08-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WBIRgdTtnf2cYfoSHSLEb",
      externalLink: "https://open.spotify.com/album/5WBIRgdTtnf2cYfoSHSLEb",
    },
  ],
} as const satisfies Release
