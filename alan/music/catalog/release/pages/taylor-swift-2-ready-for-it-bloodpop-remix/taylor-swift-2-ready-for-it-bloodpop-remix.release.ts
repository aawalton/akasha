import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2ReadyForItBloodpopRemix = {
  id: "01a0676a-d727-704f-9f9c-1f95636bc95f",
  type: "page-type/release",
  slug: "taylor-swift-2-ready-for-it-bloodpop-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2017-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45fMDoh9dhhQicddIZzhKM",
      externalLink: "https://open.spotify.com/album/45fMDoh9dhhQicddIZzhKM",
    },
  ],
  title: "...Ready For It? (BloodPop® Remix)",
} as const satisfies Release
