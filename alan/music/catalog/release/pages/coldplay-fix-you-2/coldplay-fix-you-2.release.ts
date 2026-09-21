import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayFixYou2 = {
  id: "01a0676a-d71e-7006-875c-9a56dc0c73ae",
  type: "page-type/release",
  slug: "coldplay-fix-you-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2005-09-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6CbCdwVGEff1wKT5bxNtOR",
      externalLink: "https://open.spotify.com/album/6CbCdwVGEff1wKT5bxNtOR",
    },
  ],
  title: "Fix You",
} as const satisfies Release
