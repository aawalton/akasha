import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3MusicBoxDancer = {
  id: "01a0676a-d725-701a-a301-6bf63d00ee4b",
  type: "page-type/release",
  slug: "the-piano-guys-3-music-box-dancer",
  title: "Music Box Dancer",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 2.716267,
  ownProgress: 2.716267,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-12-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5JfMSWjO3ZcPh1L1DiiwWp",
      externalLink: "https://open.spotify.com/album/5JfMSWjO3ZcPh1L1DiiwWp",
    },
  ],
} as const satisfies Release
