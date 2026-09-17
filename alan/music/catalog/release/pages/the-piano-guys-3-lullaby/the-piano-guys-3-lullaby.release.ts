import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Lullaby = {
  id: "01a0676a-d724-7013-b2a8-662cc89e47bb",
  type: "page-type/release",
  slug: "the-piano-guys-3-lullaby",
  ownLength: 40.18955,
  ownProgress: 40.18955,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-10-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "67uAvAd0rwasQLreVSXnur",
      externalLink: "https://open.spotify.com/album/67uAvAd0rwasQLreVSXnur",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lullaby",
} as const satisfies Release
