import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryOneOfTheBoys = {
  id: "01a0676a-d726-7034-a9f9-6ac805013c90",
  type: "page-type/release",
  slug: "katy-perry-one-of-the-boys",
  title: "One Of The Boys",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 43.68565,
  ownProgress: 43.68565,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-06-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0r2BUyPTmpbfuz4rR39mLl",
      externalLink: "https://open.spotify.com/album/0r2BUyPTmpbfuz4rR39mLl",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
