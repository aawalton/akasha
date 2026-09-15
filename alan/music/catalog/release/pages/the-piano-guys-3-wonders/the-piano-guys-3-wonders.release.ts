import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Wonders = {
  id: "01a0676a-d731-7035-a5f7-c9af735094d2",
  type: "release",
  slug: "the-piano-guys-3-wonders",
  title: "Wonders",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 47.300383,
  ownProgress: 47.300383,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-10-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ezYUAyMAoiOnAu80UVzcS",
      externalLink: "https://open.spotify.com/album/1ezYUAyMAoiOnAu80UVzcS",
    },
  ],
} as const satisfies Release
