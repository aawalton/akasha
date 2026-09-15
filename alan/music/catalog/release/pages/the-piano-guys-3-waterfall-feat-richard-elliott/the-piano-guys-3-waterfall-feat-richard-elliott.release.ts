import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WaterfallFeatRichardElliott = {
  id: "01a0676a-d730-701f-98d1-563221e10884",
  type: "page-type/release",
  slug: "the-piano-guys-3-waterfall-feat-richard-elliott",
  title: "Waterfall (feat. Richard Elliott)",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 3.1216,
  ownProgress: 3.1216,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-05-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21sRscW4WG2yM6LdOfPKOe",
      externalLink: "https://open.spotify.com/album/21sRscW4WG2yM6LdOfPKOe",
    },
  ],
} as const satisfies Release
