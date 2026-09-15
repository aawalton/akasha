import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryRiseRemixes = {
  id: "01a0676a-d728-700d-be25-98cfc5df410f",
  type: "page-type/release",
  slug: "katy-perry-rise-remixes",
  title: "Rise Remixes",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 10.882417,
  ownProgress: 10.882417,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-08-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Z280iRLhrqePZNblTYyEY",
      externalLink: "https://open.spotify.com/album/4Z280iRLhrqePZNblTYyEY",
    },
  ],
} as const satisfies Release
