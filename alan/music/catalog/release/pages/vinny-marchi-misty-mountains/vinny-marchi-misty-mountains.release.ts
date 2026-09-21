import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiMistyMountains = {
  id: "01a0676a-d724-707b-8c6a-fc025034c997",
  type: "page-type/release",
  slug: "vinny-marchi-misty-mountains",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-08-27",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0uxc4ueSLDgqfPzZTArLuW",
      externalLink: "https://open.spotify.com/album/0uxc4ueSLDgqfPzZTArLuW",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Misty Mountains",
} as const satisfies Release
