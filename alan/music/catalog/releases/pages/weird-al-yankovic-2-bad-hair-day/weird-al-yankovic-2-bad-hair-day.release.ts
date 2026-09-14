import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const weirdAlYankovic2BadHairDay = {
  id: "01a0676a-d718-7009-b410-69a2d95820b8",
  type: "release",
  slug: "weird-al-yankovic-2-bad-hair-day",
  title: "Bad Hair Day",
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 42.306833,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-12-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Jlz2oUJcRROhY8MFMp609",
      externalLink: "https://open.spotify.com/album/0Jlz2oUJcRROhY8MFMp609",
    },
  ],
} as const satisfies Release
