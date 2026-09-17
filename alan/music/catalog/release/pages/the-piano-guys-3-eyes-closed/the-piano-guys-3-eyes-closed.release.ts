import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3EyesClosed = {
  id: "01a0676a-d71d-7056-a0b9-d1c82117f828",
  type: "page-type/release",
  slug: "the-piano-guys-3-eyes-closed",
  ownLength: 4.0759,
  ownProgress: 4.0759,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2023-09-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2izrnFwPNKeYR6ESYC3wRs",
      externalLink: "https://open.spotify.com/album/2izrnFwPNKeYR6ESYC3wRs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eyes Closed",
} as const satisfies Release
