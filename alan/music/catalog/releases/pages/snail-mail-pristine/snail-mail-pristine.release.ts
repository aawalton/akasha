import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const snailMailPristine = {
  id: "01a0676a-d727-7023-aca6-499950037cd1",
  type: "release",
  slug: "snail-mail-pristine",
  title: "Pristine",
  partOfCollections: ["artist/snail-mail"],
  position: 0,
  ownLength: 4.922217,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  rank: "D",
  publishedAt: "2018-03-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7lyLXAeuKA2N3TdcUceYEh",
      externalLink: "https://open.spotify.com/album/7lyLXAeuKA2N3TdcUceYEh",
    },
  ],
} as const satisfies Release
