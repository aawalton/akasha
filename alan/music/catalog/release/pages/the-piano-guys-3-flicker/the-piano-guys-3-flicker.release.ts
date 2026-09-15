import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Flicker = {
  id: "01a0676a-d71e-7011-b32d-0341f48183e3",
  type: "page-type/release",
  slug: "the-piano-guys-3-flicker",
  title: "Flicker",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 3.27555,
  ownProgress: 3.27555,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-11-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6f37zhIhkiLiXps8NRDbdK",
      externalLink: "https://open.spotify.com/album/6f37zhIhkiLiXps8NRDbdK",
    },
  ],
} as const satisfies Release
