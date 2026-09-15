import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynLittleDidIKnow = {
  id: "01a0676a-d723-7038-a9a8-e5b26fe0dcf9",
  type: "release",
  slug: "chaislyn-little-did-i-know",
  title: "Little Did I Know",
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  ownLength: 3.76075,
  ownProgress: 3.76075,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-11-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7a8g1qUgPRFZhurR9TclvG",
      externalLink: "https://open.spotify.com/album/7a8g1qUgPRFZhurR9TclvG",
    },
  ],
} as const satisfies Release
