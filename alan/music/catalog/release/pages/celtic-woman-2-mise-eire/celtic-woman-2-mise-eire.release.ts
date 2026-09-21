import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2MiseEire = {
  id: "01a0676a-d724-7075-ac09-4bbed1be8181",
  type: "page-type/release",
  slug: "celtic-woman-2-mise-eire",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2021-10-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4r0kLR8NN0zU3pt5chgG94",
      externalLink: "https://open.spotify.com/album/4r0kLR8NN0zU3pt5chgG94",
    },
  ],
  title: "Mise Éire",
} as const satisfies Release
