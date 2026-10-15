import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersKillerTheSound = {
  id: "01a0676a-d722-7043-8064-2f718c8b7016",
  type: "page-type/release",
  slug: "phoebe-bridgers-killer-the-sound",
  title: "Killer + The Sound",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2018-04-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0YkXSjRA7Zim0xIuZ26CRs",
      externalLink: "https://open.spotify.com/album/0YkXSjRA7Zim0xIuZ26CRs",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-10-15T14:00:33.419Z",
} as const satisfies Release
