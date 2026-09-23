import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Reputation = {
  id: "01a0676a-d727-706a-a482-73ccf2287edf",
  type: "page-type/release",
  slug: "taylor-swift-2-reputation",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2017-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6DEjYFkNZh67HP7R9PSZvv",
      externalLink: "https://open.spotify.com/album/6DEjYFkNZh67HP7R9PSZvv",
    },
  ],
  title: "reputation",
} as const satisfies Release
