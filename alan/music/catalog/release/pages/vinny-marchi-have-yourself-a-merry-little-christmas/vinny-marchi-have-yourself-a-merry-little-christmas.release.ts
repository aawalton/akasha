import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiHaveYourselfAMerryLittleChristmas = {
  id: "01a0676a-d71f-705e-8645-b221dd41da75",
  type: "page-type/release",
  slug: "vinny-marchi-have-yourself-a-merry-little-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2025-12-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "78iMfpsmCqjkZ9vcU7lPss",
      externalLink: "https://open.spotify.com/album/78iMfpsmCqjkZ9vcU7lPss",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Have Yourself A Merry Little Christmas",
} as const satisfies Release
