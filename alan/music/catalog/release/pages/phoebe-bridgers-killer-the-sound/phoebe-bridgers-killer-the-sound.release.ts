import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersKillerTheSound = {
  id: "01a0676a-d722-7043-8064-2f718c8b7016",
  type: "page-type/release",
  slug: "phoebe-bridgers-killer-the-sound",
  title: "Killer + The Sound",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 7.919767,
  ownProgress: 7.919767,
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
} as const satisfies Release
