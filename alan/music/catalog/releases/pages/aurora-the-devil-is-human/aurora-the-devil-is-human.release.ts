import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const auroraTheDevilIsHuman = {
  id: "01a0676a-d72d-7001-83f8-e9bcc2db98a1",
  type: "release",
  slug: "aurora-the-devil-is-human",
  title: "The Devil is Human",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 3.010217,
  ownProgress: 3.010217,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-07-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39UyPPm0nKdFi4Vd9Hljzu",
      externalLink: "https://open.spotify.com/album/39UyPPm0nKdFi4Vd9Hljzu",
    },
  ],
} as const satisfies Release
