import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2BeforeThisWorld = {
  id: "01a0676a-d718-7034-895c-520d3228af3d",
  type: "page-type/release",
  slug: "james-taylor-2-before-this-world",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2015-06-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2pmZbxvc1ysu9pddrpAZe9",
      externalLink: "https://open.spotify.com/album/2pmZbxvc1ysu9pddrpAZe9",
    },
  ],
  title: "Before This World",
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
