import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2In3D = {
  id: "01a0676a-d721-7062-9e01-7a1c01315235",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-in-3-d",
  title: "In 3-D",
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 44.454167,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1984-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mIwtOp8f0flDHmn8jOxDD",
      externalLink: "https://open.spotify.com/album/5mIwtOp8f0flDHmn8jOxDD",
    },
  ],
} as const satisfies Release
