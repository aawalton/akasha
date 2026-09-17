import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Ghost = {
  id: "01a0676a-d71e-7058-811c-d54bd4bcae1e",
  type: "page-type/release",
  slug: "the-piano-guys-3-ghost",
  ownLength: 10.58825,
  ownProgress: 10.58825,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-09-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "61MpbGAqKxop2j95E9Ywu5",
      externalLink: "https://open.spotify.com/album/61MpbGAqKxop2j95E9Ywu5",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ghost",
} as const satisfies Release
