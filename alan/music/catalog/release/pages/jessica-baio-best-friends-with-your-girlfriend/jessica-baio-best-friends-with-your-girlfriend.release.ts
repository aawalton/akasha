import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioBestFriendsWithYourGirlfriend = {
  id: "01a0676a-d718-7042-ab3f-611642ef45e3",
  type: "page-type/release",
  slug: "jessica-baio-best-friends-with-your-girlfriend",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-06-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2DPSrGklX48Rc1phYSluUn",
      externalLink: "https://open.spotify.com/album/2DPSrGklX48Rc1phYSluUn",
    },
  ],
  title: "best friends with your girlfriend",
} as const satisfies Release
