import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraMusicForTheFellowWitchesOutThere = {
  id: "01a0676a-d725-701b-9da9-41ab4246bac4",
  type: "page-type/release",
  slug: "aurora-music-for-the-fellow-witches-out-there",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-02-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31R3o5kDvOHm2QI7hXwIPv",
      externalLink: "https://open.spotify.com/album/31R3o5kDvOHm2QI7hXwIPv",
    },
  ],
  title: "MUSIC FOR THE FELLOW WITCHES OUT THERE",
} as const satisfies Release
