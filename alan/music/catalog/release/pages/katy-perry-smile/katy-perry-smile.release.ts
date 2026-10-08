import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerrySmile = {
  id: "01a0676a-d729-702b-a32f-f330a908359d",
  type: "page-type/release",
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
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
