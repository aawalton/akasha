import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishGuitarSongs = {
  id: "01a0676a-d71f-7034-bbc3-f31973dfb3b1",
  type: "page-type/release",
  slug: "billie-eilish-guitar-songs",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2022-07-21",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YPWxMpQEC8kcOuefgXbhj",
      externalLink: "https://open.spotify.com/album/1YPWxMpQEC8kcOuefgXbhj",
    },
  ],
  title: "Guitar Songs",
} as const satisfies Release
