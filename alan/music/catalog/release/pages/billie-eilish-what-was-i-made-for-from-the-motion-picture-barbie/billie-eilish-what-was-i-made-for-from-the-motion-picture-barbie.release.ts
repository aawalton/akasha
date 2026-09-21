import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishWhatWasIMadeForFromTheMotionPictureBarbie = {
  id: "01a0676a-d730-704c-a08d-ec15452dcaf6",
  type: "page-type/release",
  slug: "billie-eilish-what-was-i-made-for-from-the-motion-picture-barbie",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2023-07-13",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3AafSrFIbJPH6BJHiJm1Cd",
      externalLink: "https://open.spotify.com/album/3AafSrFIbJPH6BJHiJm1Cd",
    },
  ],
  title: 'What Was I Made For? [From The Motion Picture "Barbie"]',
} as const satisfies Release
