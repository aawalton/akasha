import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryAllYouNeedIsLove = {
  id: "01a0676a-d716-702c-b0cd-d7e3d905a320",
  type: "page-type/release",
  slug: "katy-perry-all-you-need-is-love",
  title: "All You Need Is Love",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.435633,
  ownProgress: 3.435633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0yLJMIgyF3luW7T884EOGR",
      externalLink: "https://open.spotify.com/album/0yLJMIgyF3luW7T884EOGR",
    },
  ],
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
