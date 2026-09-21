import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WalkingTheWireLargo = {
  id: "01a0676a-d730-7016-9066-1b203cf983e6",
  type: "page-type/release",
  slug: "the-piano-guys-3-walking-the-wire-largo",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2017-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2DFj2e7BhSYUkeVSEwdwfu",
      externalLink: "https://open.spotify.com/album/2DFj2e7BhSYUkeVSEwdwfu",
    },
  ],
  title: "Walking the Wire / Largo",
} as const satisfies Release
