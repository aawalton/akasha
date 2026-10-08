import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2JamesTaylorLive = {
  id: "01a0676a-d722-701c-bc4b-647c865f71ef",
  type: "page-type/release",
  slug: "james-taylor-2-james-taylor-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1993-06-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "38OACLXl1hgUnsuCUv13HC",
      externalLink: "https://open.spotify.com/album/38OACLXl1hgUnsuCUv13HC",
    },
  ],
  title: "James Taylor Live",
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
