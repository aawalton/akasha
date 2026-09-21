import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSingularActI = {
  id: "01a0676a-d729-700f-9cb3-718c855cfc33",
  type: "page-type/release",
  slug: "sabrina-carpenter-singular-act-i",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2018-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29mlGxS6kxq1EHxlX1EAZK",
      externalLink: "https://open.spotify.com/album/29mlGxS6kxq1EHxlX1EAZK",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Singular Act I",
} as const satisfies Release
