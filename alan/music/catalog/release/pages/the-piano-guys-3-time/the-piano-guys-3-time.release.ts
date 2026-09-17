import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Time = {
  id: "01a0676a-d72e-7042-8f64-cb8938373e4b",
  type: "page-type/release",
  slug: "the-piano-guys-3-time",
  ownLength: 4.2,
  ownProgress: 4.2,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2024-05-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5cmMB8MIEdnjkVjixErE2V",
      externalLink: "https://open.spotify.com/album/5cmMB8MIEdnjkVjixErE2V",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Time",
} as const satisfies Release
