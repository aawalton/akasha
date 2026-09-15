import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2MiseEire = {
  id: "01a0676a-d724-7075-ac09-4bbed1be8181",
  type: "release",
  slug: "celtic-woman-2-mise-eire",
  title: "Mise Éire",
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  ownLength: 3.879333,
  ownProgress: 3.879333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4r0kLR8NN0zU3pt5chgG94",
      externalLink: "https://open.spotify.com/album/4r0kLR8NN0zU3pt5chgG94",
    },
  ],
} as const satisfies Release
