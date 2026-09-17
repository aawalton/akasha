import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3InTheStars = {
  id: "01a0676a-d721-706c-a3c3-6ff50aa72a8c",
  type: "page-type/release",
  slug: "the-piano-guys-3-in-the-stars",
  ownLength: 8.874583333333334,
  ownProgress: 8.874583,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2023-06-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0skw3Gc7tGgkx3NMQNIPy2",
      externalLink: "https://open.spotify.com/album/0skw3Gc7tGgkx3NMQNIPy2",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "In The Stars",
} as const satisfies Release
