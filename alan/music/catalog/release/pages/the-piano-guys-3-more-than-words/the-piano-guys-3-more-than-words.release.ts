import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3MoreThanWords = {
  id: "01a0676a-d725-7004-a465-a49f4d62adaf",
  type: "page-type/release",
  slug: "the-piano-guys-3-more-than-words",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2012-09-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4yl3dQ5Y7Lhg53ofj1sQSm",
      externalLink: "https://open.spotify.com/album/4yl3dQ5Y7Lhg53ofj1sQSm",
    },
  ],
  title: "More Than Words",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
