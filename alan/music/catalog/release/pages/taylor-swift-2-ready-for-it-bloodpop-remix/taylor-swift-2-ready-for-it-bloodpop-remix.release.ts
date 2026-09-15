import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2ReadyForItBloodpopRemix = {
  id: "01a0676a-d727-704f-9f9c-1f95636bc95f",
  type: "release",
  slug: "taylor-swift-2-ready-for-it-bloodpop-remix",
  title: "...Ready For It? (BloodPop® Remix)",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 3.158467,
  ownProgress: 3.158467,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-12-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45fMDoh9dhhQicddIZzhKM",
      externalLink: "https://open.spotify.com/album/45fMDoh9dhhQicddIZzhKM",
    },
  ],
} as const satisfies Release
