import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioRadioRemixes = {
  id: "01a0676a-d727-7041-9f21-464025c9be1d",
  type: "page-type/release",
  slug: "jessica-baio-radio-remixes",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2025-04-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49SW8TraLibp3D0SCu2duV",
      externalLink: "https://open.spotify.com/album/49SW8TraLibp3D0SCu2duV",
    },
  ],
  title: "Radio (Remixes)",
} as const satisfies Release
