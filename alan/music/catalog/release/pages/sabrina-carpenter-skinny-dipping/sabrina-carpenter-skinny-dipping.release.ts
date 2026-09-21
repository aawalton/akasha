import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSkinnyDipping = {
  id: "01a0676a-d729-7019-baff-6c3c9f901734",
  type: "page-type/release",
  slug: "sabrina-carpenter-skinny-dipping",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2021-09-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2NbUBAN5Mv7KAacJHOtC49",
      externalLink: "https://open.spotify.com/album/2NbUBAN5Mv7KAacJHOtC49",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "skinny dipping",
} as const satisfies Release
