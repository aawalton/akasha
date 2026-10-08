import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Flicker = {
  id: "01a0676a-d71e-7011-b32d-0341f48183e3",
  type: "page-type/release",
  slug: "the-piano-guys-3-flicker",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2017-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6f37zhIhkiLiXps8NRDbdK",
      externalLink: "https://open.spotify.com/album/6f37zhIhkiLiXps8NRDbdK",
    },
  ],
  title: "Flicker",
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
