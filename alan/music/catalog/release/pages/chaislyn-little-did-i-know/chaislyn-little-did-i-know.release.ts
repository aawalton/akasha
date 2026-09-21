import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynLittleDidIKnow = {
  id: "01a0676a-d723-7038-a9a8-e5b26fe0dcf9",
  type: "page-type/release",
  slug: "chaislyn-little-did-i-know",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2018-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7a8g1qUgPRFZhurR9TclvG",
      externalLink: "https://open.spotify.com/album/7a8g1qUgPRFZhurR9TclvG",
    },
  ],
  title: "Little Did I Know",
} as const satisfies Release
