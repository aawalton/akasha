import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3DonTYouWorryChildInstrumental = {
  id: "01a0676a-d71c-7028-b0f6-54fb4ce57e79",
  type: "page-type/release",
  slug: "the-piano-guys-3-don-t-you-worry-child-instrumental",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2013-07-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48yKxFKvUmuBx99afSoJi0",
      externalLink: "https://open.spotify.com/album/48yKxFKvUmuBx99afSoJi0",
    },
  ],
  title: "Don't You Worry Child (Instrumental)",
} as const satisfies Release
