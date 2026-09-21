import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayFixYou = {
  id: "01a0676a-d71e-7005-9afb-f24dc9bb3eb7",
  type: "page-type/release",
  slug: "coldplay-fix-you",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2005-09-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1skkhQGSj1VljTbaejos3f",
      externalLink: "https://open.spotify.com/album/1skkhQGSj1VljTbaejos3f",
    },
  ],
  title: "Fix You",
} as const satisfies Release
