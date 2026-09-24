import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleWhenWeWereYoung = {
  id: "01a0676a-d730-705b-b02f-c388c06df215",
  type: "page-type/release",
  slug: "adele-when-we-were-young",
  title: "When We Were Young",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 4.848333333333334,
  ownProgress: 4.848333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-02-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Uxy3eGrFAI1VpGRmZIkM7",
      externalLink: "https://open.spotify.com/album/5Uxy3eGrFAI1VpGRmZIkM7",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
