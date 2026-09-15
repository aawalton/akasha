import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryNeverWornWhite = {
  id: "01a0676a-d725-704f-b542-27c0dd4b5c54",
  type: "page-type/release",
  slug: "katy-perry-never-worn-white",
  title: "Never Worn White",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.75065,
  ownProgress: 3.75065,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-03-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Gubs5k8ay34m9a0yiliRa",
      externalLink: "https://open.spotify.com/album/0Gubs5k8ay34m9a0yiliRa",
    },
  ],
} as const satisfies Release
