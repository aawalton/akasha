import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Anyone = {
  id: "01a0676a-d717-702d-a35f-79d1baa1b596",
  type: "page-type/release",
  slug: "the-piano-guys-3-anyone",
  ownLength: 3.6998,
  ownProgress: 3.6998,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-07-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kMFbTRwwbulAlWmK8lo4k",
      externalLink: "https://open.spotify.com/album/0kMFbTRwwbulAlWmK8lo4k",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Anyone",
} as const satisfies Release
