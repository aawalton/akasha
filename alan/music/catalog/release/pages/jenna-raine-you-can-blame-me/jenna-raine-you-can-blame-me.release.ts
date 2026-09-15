import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineYouCanBlameMe = {
  id: "01a0676a-d732-7004-96b8-224f25437889",
  type: "page-type/release",
  slug: "jenna-raine-you-can-blame-me",
  title: "You Can Blame Me",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 3.027767,
  ownProgress: 3.027767,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2019-10-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7da54fsZaXffuBXyaB5YeR",
      externalLink: "https://open.spotify.com/album/7da54fsZaXffuBXyaB5YeR",
    },
  ],
} as const satisfies Release
