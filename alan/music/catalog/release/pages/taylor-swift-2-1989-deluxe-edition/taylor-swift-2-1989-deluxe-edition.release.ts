import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift21989DeluxeEdition = {
  id: "01a0676a-d714-7017-8056-909de6bb343f",
  type: "page-type/release",
  slug: "taylor-swift-2-1989-deluxe-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2014-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "34OkZVpuzBa9y40DCy0LPR",
      externalLink: "https://open.spotify.com/album/34OkZVpuzBa9y40DCy0LPR",
    },
  ],
  title: "1989 (Deluxe Edition)",
} as const satisfies Release
