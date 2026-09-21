import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayPrincessOfChinaRadioEdit = {
  id: "01a0676a-d727-7020-a5f3-65841e2a3164",
  type: "page-type/release",
  slug: "coldplay-princess-of-china-radio-edit",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2012-04-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5O8q5vQVJIaCuDpC01AtaP",
      externalLink: "https://open.spotify.com/album/5O8q5vQVJIaCuDpC01AtaP",
    },
  ],
  title: "Princess of China [Radio Edit]",
} as const satisfies Release
