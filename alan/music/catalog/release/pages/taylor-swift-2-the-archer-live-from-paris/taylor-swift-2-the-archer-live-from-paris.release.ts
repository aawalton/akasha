import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheArcherLiveFromParis = {
  id: "01a0676a-d72c-7025-b6d8-8ad4d0913b2b",
  type: "page-type/release",
  slug: "taylor-swift-2-the-archer-live-from-paris",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2A1msASmUbUdaZyeOxpbAD",
      externalLink: "https://open.spotify.com/album/2A1msASmUbUdaZyeOxpbAD",
    },
  ],
  title: "The Archer (Live From Paris)",
} as const satisfies Release
