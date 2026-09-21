import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheDevilIsHuman = {
  id: "01a0676a-d72d-7001-83f8-e9bcc2db98a1",
  type: "page-type/release",
  slug: "aurora-the-devil-is-human",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-07-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39UyPPm0nKdFi4Vd9Hljzu",
      externalLink: "https://open.spotify.com/album/39UyPPm0nKdFi4Vd9Hljzu",
    },
  ],
  title: "The Devil is Human",
} as const satisfies Release
