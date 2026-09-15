import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Red = {
  id: "01a0676a-d727-705c-bc19-dd32d0923bbf",
  type: "page-type/release",
  slug: "taylor-swift-2-red",
  title: "Red",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 64.923233,
  ownProgress: 64.923233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-10-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1EoDsNmgTLtmwe1BDAVxV5",
      externalLink: "https://open.spotify.com/album/1EoDsNmgTLtmwe1BDAVxV5",
    },
  ],
} as const satisfies Release
