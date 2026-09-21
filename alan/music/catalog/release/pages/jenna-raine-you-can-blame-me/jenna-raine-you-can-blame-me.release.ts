import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineYouCanBlameMe = {
  id: "01a0676a-d732-7004-96b8-224f25437889",
  type: "page-type/release",
  slug: "jenna-raine-you-can-blame-me",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2019-10-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7da54fsZaXffuBXyaB5YeR",
      externalLink: "https://open.spotify.com/album/7da54fsZaXffuBXyaB5YeR",
    },
  ],
  title: "You Can Blame Me",
} as const satisfies Release
