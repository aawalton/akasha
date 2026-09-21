import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiHoldingOnToYou = {
  id: "01a0676a-d720-704b-8c26-140c6ea6fc42",
  type: "page-type/release",
  slug: "vinny-marchi-holding-on-to-you",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3tPbYs1xW5WVjxzwDYOZgd",
      externalLink: "https://open.spotify.com/album/3tPbYs1xW5WVjxzwDYOZgd",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "holding on to you",
} as const satisfies Release
