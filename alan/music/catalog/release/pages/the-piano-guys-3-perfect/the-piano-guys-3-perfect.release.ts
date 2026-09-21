import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Perfect = {
  id: "01a0676a-d726-706e-b99a-946c4f1c8121",
  type: "page-type/release",
  slug: "the-piano-guys-3-perfect",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2017-07-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "34MK1MIhRB9evwfomSyMig",
      externalLink: "https://open.spotify.com/album/34MK1MIhRB9evwfomSyMig",
    },
  ],
  title: "Perfect",
} as const satisfies Release
