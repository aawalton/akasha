import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairo2HoldU = {
  id: "01a0676a-d714-701b-8654-e3ee4dc5c8cc",
  type: "page-type/release",
  slug: "clairo-2-hold-u",
  title: "2 Hold U",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 1.981283,
  ownProgress: 1.981283,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2017-04-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SvkaUOCDaJPS2Guc4qChc",
      externalLink: "https://open.spotify.com/album/3SvkaUOCDaJPS2Guc4qChc",
    },
  ],
} as const satisfies Release
