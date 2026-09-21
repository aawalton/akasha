import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2GodRestYeMerryGentlemen = {
  id: "01a0676a-d71f-700d-8692-e6dcf0cbf824",
  type: "page-type/release",
  slug: "celtic-woman-2-god-rest-ye-merry-gentlemen",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2025-10-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5560w0xSWHBj61MAULRoqw",
      externalLink: "https://open.spotify.com/album/5560w0xSWHBj61MAULRoqw",
      lastSyncedAt: "2026-01-21",
    },
  ],
  title: "God Rest Ye Merry Gentlemen",
} as const satisfies Release
