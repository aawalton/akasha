import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3ChristmasTogether = {
  id: "01a0676a-d71a-7043-9e29-d6ef6d70d08b",
  type: "page-type/release",
  slug: "the-piano-guys-3-christmas-together",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2017-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6l7eh2iJ25bUDYHFpMZLBM",
      externalLink: "https://open.spotify.com/album/6l7eh2iJ25bUDYHFpMZLBM",
    },
  ],
  title: "Christmas Together",
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
