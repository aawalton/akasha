import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3PopOnPiano = {
  id: "01a0676a-d727-7005-962e-ca0a48d7cb96",
  type: "page-type/release",
  slug: "the-piano-guys-3-pop-on-piano",
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
