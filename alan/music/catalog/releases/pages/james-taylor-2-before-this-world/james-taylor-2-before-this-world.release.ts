import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const jamesTaylor2BeforeThisWorld = {
  id: "01a0676a-d718-7034-895c-520d3228af3d",
  type: "release",
  slug: "james-taylor-2-before-this-world",
  title: "Before This World",
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  ownLength: 41.83505,
  ownProgress: 41.83505,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-06-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2pmZbxvc1ysu9pddrpAZe9",
      externalLink: "https://open.spotify.com/album/2pmZbxvc1ysu9pddrpAZe9",
    },
  ],
} as const satisfies Release
