import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Chill = {
  id: "01a0676a-d71a-702b-af29-cfba10523613",
  type: "page-type/release",
  slug: "the-piano-guys-3-chill",
  ownLength: 49.04045,
  ownProgress: 49.04045,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-10-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2YrqSULsgaP0kZ7NkfIJz3",
      externalLink: "https://open.spotify.com/album/2YrqSULsgaP0kZ7NkfIJz3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Chill",
} as const satisfies Release
