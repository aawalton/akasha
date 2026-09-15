import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBornToBeYours = {
  id: "01a0676a-d719-7023-9ec1-e675c5e41789",
  type: "page-type/release",
  slug: "imagine-dragons-born-to-be-yours",
  title: "Born To Be Yours",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 3.222,
  ownProgress: 3.222,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-06-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Nlbg1BHLXDKqQVQ9ErCmg",
      externalLink: "https://open.spotify.com/album/3Nlbg1BHLXDKqQVQ9ErCmg",
    },
  ],
} as const satisfies Release
