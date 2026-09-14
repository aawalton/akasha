import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const thePianoGuys3ThePianoGuys = {
  id: "01a0676a-d72d-7054-af56-5c1c5c1bf681",
  type: "release",
  slug: "the-piano-guys-3-the-piano-guys",
  title: "The Piano Guys",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 63.723433,
  ownProgress: 63.723433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-01-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6P2EwTc87RwLx2ANZVr1JY",
      externalLink: "https://open.spotify.com/album/6P2EwTc87RwLx2ANZVr1JY",
    },
  ],
} as const satisfies Release
