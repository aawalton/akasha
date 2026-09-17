import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3AsItWas = {
  id: "01a0676a-d717-7034-8f69-676b6ecac363",
  type: "page-type/release",
  slug: "the-piano-guys-3-as-it-was",
  ownLength: 5.9315,
  ownProgress: 5.9315,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-06-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47tg96fYRMlY774hpmBtmv",
      externalLink: "https://open.spotify.com/album/47tg96fYRMlY774hpmBtmv",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "As It Was",
} as const satisfies Release
