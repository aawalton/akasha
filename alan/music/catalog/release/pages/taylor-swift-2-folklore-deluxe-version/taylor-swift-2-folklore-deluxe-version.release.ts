import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2FolkloreDeluxeVersion = {
  id: "01a0676a-d71e-701c-9ac7-68519231a50f",
  type: "page-type/release",
  slug: "taylor-swift-2-folklore-deluxe-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-08-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pzvBxYgT6OVwJLtHkrdQK",
      externalLink: "https://open.spotify.com/album/1pzvBxYgT6OVwJLtHkrdQK",
    },
  ],
  title: "folklore (deluxe version)",
} as const satisfies Release
