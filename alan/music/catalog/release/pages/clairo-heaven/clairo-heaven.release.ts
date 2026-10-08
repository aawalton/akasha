import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoHeaven = {
  id: "01a0676a-d720-701d-b6ad-f2f2dd97a9cc",
  type: "page-type/release",
  slug: "clairo-heaven",
  title: "Heaven",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 3.89785,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "26tFSM2HfVCB0a4OLVxU4f",
      externalLink: "https://open.spotify.com/album/26tFSM2HfVCB0a4OLVxU4f",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-15T16:34:44.000Z",
} as const satisfies Release
