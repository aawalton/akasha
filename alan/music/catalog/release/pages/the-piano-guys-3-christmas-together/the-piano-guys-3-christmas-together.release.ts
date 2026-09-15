import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3ChristmasTogether = {
  id: "01a0676a-d71a-7043-9e29-d6ef6d70d08b",
  type: "page-type/release",
  slug: "the-piano-guys-3-christmas-together",
  title: "Christmas Together",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 47.211967,
  ownProgress: 47.211967,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-10-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6l7eh2iJ25bUDYHFpMZLBM",
      externalLink: "https://open.spotify.com/album/6l7eh2iJ25bUDYHFpMZLBM",
    },
  ],
} as const satisfies Release
