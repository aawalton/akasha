import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Wonders = {
  id: "01a0676a-d731-7035-a5f7-c9af735094d2",
  type: "page-type/release",
  slug: "the-piano-guys-3-wonders",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2014-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ezYUAyMAoiOnAu80UVzcS",
      externalLink: "https://open.spotify.com/album/1ezYUAyMAoiOnAu80UVzcS",
    },
  ],
  title: "Wonders",
} as const satisfies Release
