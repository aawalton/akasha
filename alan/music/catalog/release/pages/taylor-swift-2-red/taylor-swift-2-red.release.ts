import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Red = {
  id: "01a0676a-d727-705c-bc19-dd32d0923bbf",
  type: "page-type/release",
  slug: "taylor-swift-2-red",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2012-10-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1EoDsNmgTLtmwe1BDAVxV5",
      externalLink: "https://open.spotify.com/album/1EoDsNmgTLtmwe1BDAVxV5",
    },
  ],
  title: "Red",
} as const satisfies Release
