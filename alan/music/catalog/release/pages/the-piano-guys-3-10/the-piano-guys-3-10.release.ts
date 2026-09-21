import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys310 = {
  id: "01a0676a-d714-700e-b49a-811eab17e492",
  type: "page-type/release",
  slug: "the-piano-guys-3-10",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2020-11-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Zky97zfugw0DZQzKPkWFB",
      externalLink: "https://open.spotify.com/album/1Zky97zfugw0DZQzKPkWFB",
    },
  ],
  title: "10",
} as const satisfies Release
