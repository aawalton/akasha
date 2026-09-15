import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift21989DeluxeEdition = {
  id: "01a0676a-d714-7017-8056-909de6bb343f",
  type: "page-type/release",
  slug: "taylor-swift-2-1989-deluxe-edition",
  title: "1989 (Deluxe Edition)",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 68.7608,
  ownProgress: 68.7608,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-10-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "34OkZVpuzBa9y40DCy0LPR",
      externalLink: "https://open.spotify.com/album/34OkZVpuzBa9y40DCy0LPR",
    },
  ],
} as const satisfies Release
