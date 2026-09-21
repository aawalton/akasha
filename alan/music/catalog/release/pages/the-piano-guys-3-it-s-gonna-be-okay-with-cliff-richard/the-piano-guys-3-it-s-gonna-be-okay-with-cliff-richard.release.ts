import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3ItSGonnaBeOkayWithCliffRichard = {
  id: "01a0676a-d722-7010-833b-3216d59a4dfb",
  type: "page-type/release",
  slug: "the-piano-guys-3-it-s-gonna-be-okay-with-cliff-richard",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2017-04-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1o1nGRSY4e3ixTYjD36GYS",
      externalLink: "https://open.spotify.com/album/1o1nGRSY4e3ixTYjD36GYS",
    },
  ],
  title: "(It's Gonna Be) Okay (with Cliff Richard)",
} as const satisfies Release
