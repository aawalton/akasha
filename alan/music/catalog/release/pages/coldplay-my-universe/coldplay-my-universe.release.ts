import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMyUniverse = {
  id: "01a0676a-d725-7037-8ce6-ef50a6855036",
  type: "page-type/release",
  slug: "coldplay-my-universe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-09-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6iVS1t7wQUHItUnCxH7epG",
      externalLink: "https://open.spotify.com/album/6iVS1t7wQUHItUnCxH7epG",
    },
  ],
  title: "My Universe",
} as const satisfies Release
