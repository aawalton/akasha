import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WayfaringStranger = {
  id: "01a0676a-d730-7027-9b00-31d74b13549b",
  type: "page-type/release",
  slug: "the-piano-guys-3-wayfaring-stranger",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2023-04-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ZUIyAAGMqGNBKKaJk4vJX",
      externalLink: "https://open.spotify.com/album/0ZUIyAAGMqGNBKKaJk4vJX",
    },
  ],
  title: "Wayfaring Stranger",
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
