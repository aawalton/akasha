import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBornToBeYours = {
  id: "01a0676a-d719-7023-9ec1-e675c5e41789",
  type: "page-type/release",
  slug: "imagine-dragons-born-to-be-yours",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2018-06-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Nlbg1BHLXDKqQVQ9ErCmg",
      externalLink: "https://open.spotify.com/album/3Nlbg1BHLXDKqQVQ9ErCmg",
    },
  ],
  title: "Born To Be Yours",
} as const satisfies Release
