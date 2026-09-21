import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTheBlueRoom = {
  id: "01a0676a-d72c-7033-9c91-604351eaf60f",
  type: "page-type/release",
  slug: "coldplay-the-blue-room",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "1999-10-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MVb2CWB36x7VwYo5sZmf2",
      externalLink: "https://open.spotify.com/album/3MVb2CWB36x7VwYo5sZmf2",
    },
  ],
  title: "The Blue Room",
} as const satisfies Release
