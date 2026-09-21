import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3ThePianoGuys = {
  id: "01a0676a-d72d-7054-af56-5c1c5c1bf681",
  type: "page-type/release",
  slug: "the-piano-guys-3-the-piano-guys",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2013-01-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6P2EwTc87RwLx2ANZVr1JY",
      externalLink: "https://open.spotify.com/album/6P2EwTc87RwLx2ANZVr1JY",
    },
  ],
  title: "The Piano Guys",
} as const satisfies Release
