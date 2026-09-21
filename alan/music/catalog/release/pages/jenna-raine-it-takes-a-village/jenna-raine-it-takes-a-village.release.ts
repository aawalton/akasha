import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineItTakesAVillage = {
  id: "01a0c621-18d4-7dd0-b557-9cbca3be0472",
  type: "page-type/release",
  slug: "jenna-raine-it-takes-a-village",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2026-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7icnIK1BEAb0PPsB6LYPEr",
      externalLink: "https://open.spotify.com/album/7icnIK1BEAb0PPsB6LYPEr",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "It Takes A Village",
} as const satisfies Release
