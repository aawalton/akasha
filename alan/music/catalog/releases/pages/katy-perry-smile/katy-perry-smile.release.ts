import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const katyPerrySmile = {
  id: "01a0676a-d729-702b-a32f-f330a908359d",
  type: "release",
  slug: "katy-perry-smile",
  title: "Smile",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 2.781633,
  ownProgress: 2.781633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-07-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "61HTU0pcDaTmotLnBQgoLs",
      externalLink: "https://open.spotify.com/album/61HTU0pcDaTmotLnBQgoLs",
    },
  ],
} as const satisfies Release
