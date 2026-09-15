import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaUnstoppableSlowedReverb = {
  id: "01a0676a-d72f-704f-b0ea-4728205f57af",
  type: "release",
  slug: "sia-unstoppable-slowed-reverb",
  title: "Unstoppable (Slowed & Reverb)",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 4.2125,
  ownProgress: 4.2125,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-10-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6EU7M6V56X2zp4LHlpHESC",
      externalLink: "https://open.spotify.com/album/6EU7M6V56X2zp4LHlpHESC",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
