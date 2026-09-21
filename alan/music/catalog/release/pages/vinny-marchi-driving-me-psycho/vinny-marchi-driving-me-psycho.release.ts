import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiDrivingMePsycho = {
  id: "01a0676a-d71c-703b-961d-5cb57d7d375f",
  type: "page-type/release",
  slug: "vinny-marchi-driving-me-psycho",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-04-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ZHsmVwMtHNyg83kD2AnWY",
      externalLink: "https://open.spotify.com/album/3ZHsmVwMtHNyg83kD2AnWY",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "DRIVING ME PSYCHO",
} as const satisfies Release
