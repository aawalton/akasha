import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2JamesTaylorLive = {
  id: "01a0676a-d722-701c-bc4b-647c865f71ef",
  type: "page-type/release",
  slug: "james-taylor-2-james-taylor-live",
  title: "James Taylor Live",
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  ownLength: 120.068667,
  ownProgress: 120.068667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1993-06-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "38OACLXl1hgUnsuCUv13HC",
      externalLink: "https://open.spotify.com/album/38OACLXl1hgUnsuCUv13HC",
    },
  ],
} as const satisfies Release
