import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3SomeoneYouLoved = {
  id: "01a0676a-d729-7057-a61c-01ee3eedaf24",
  type: "page-type/release",
  slug: "the-piano-guys-3-someone-you-loved",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2019-08-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ueqbqheTXOv1vkf0KUWZT",
      externalLink: "https://open.spotify.com/album/6ueqbqheTXOv1vkf0KUWZT",
    },
  ],
  title: "Someone You Loved",
} as const satisfies Release
