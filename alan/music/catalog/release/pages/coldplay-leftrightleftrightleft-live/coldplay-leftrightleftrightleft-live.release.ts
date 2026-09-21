import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLeftrightleftrightleftLive = {
  id: "01a0676a-d722-7073-b588-3a20c6e3c383",
  type: "page-type/release",
  slug: "coldplay-leftrightleftrightleft-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2009-05-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3pboBm7GTa6V5dFXXCt52b",
      externalLink: "https://open.spotify.com/album/3pboBm7GTa6V5dFXXCt52b",
    },
  ],
  title: "LeftRightLeftRightLeft (Live)",
} as const satisfies Release
