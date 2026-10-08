import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryCosmicEnergy = {
  id: "01a0676a-d71b-702c-a6d8-c23ff45adc2c",
  type: "page-type/release",
  slug: "katy-perry-cosmic-energy",
  title: "Cosmic Energy",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 22.368233,
  ownProgress: 22.368233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-12-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MXubEDnkXIaacR9an5d9e",
      externalLink: "https://open.spotify.com/album/3MXubEDnkXIaacR9an5d9e",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
