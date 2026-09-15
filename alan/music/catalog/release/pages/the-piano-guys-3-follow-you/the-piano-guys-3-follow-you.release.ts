import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3FollowYou = {
  id: "01a0676a-d71e-7020-adc9-a3ebc6395257",
  type: "page-type/release",
  slug: "the-piano-guys-3-follow-you",
  title: "Follow You",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 3.186,
  ownProgress: 3.186,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FDAocsqnW4LJ7rrXQjBBA",
      externalLink: "https://open.spotify.com/album/6FDAocsqnW4LJ7rrXQjBBA",
    },
  ],
} as const satisfies Release
