import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3PopOnPiano = {
  id: "01a0676a-d727-7005-962e-ca0a48d7cb96",
  type: "page-type/release",
  slug: "the-piano-guys-3-pop-on-piano",
  ownLength: 49.705933333333334,
  ownProgress: 49.705933,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2026-01-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mNDXuh8WclcJ5mZ0BBvVV",
      externalLink: "https://open.spotify.com/album/5mNDXuh8WclcJ5mZ0BBvVV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Pop On Piano",
} as const satisfies Release
