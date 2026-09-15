import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayFixYou = {
  id: "01a0676a-d71e-7005-9afb-f24dc9bb3eb7",
  type: "release",
  slug: "coldplay-fix-you",
  title: "Fix You",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 20.635467,
  ownProgress: 20.635467,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-09-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1skkhQGSj1VljTbaejos3f",
      externalLink: "https://open.spotify.com/album/1skkhQGSj1VljTbaejos3f",
    },
  ],
} as const satisfies Release
