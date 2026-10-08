import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3SoFarSoGood = {
  id: "01a0676a-d729-7042-ad81-76852ba91d4a",
  type: "page-type/release",
  slug: "the-piano-guys-3-so-far-so-good",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2012-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hMT6Q6mbvD1KlOccOM5cR",
      externalLink: "https://open.spotify.com/album/1hMT6Q6mbvD1KlOccOM5cR",
    },
  ],
  title: "So Far, So Good",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
