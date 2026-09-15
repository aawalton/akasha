import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSueMeACappella = {
  id: "01a0676a-d72a-703c-9564-85504bf29587",
  type: "release",
  slug: "sabrina-carpenter-sue-me-a-cappella",
  title: "Sue Me (A Cappella)",
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  ownLength: 3.375633,
  ownProgress: 3.375633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-03-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1xbFduKsdGu9oRbhKH6puf",
      externalLink: "https://open.spotify.com/album/1xbFduKsdGu9oRbhKH6puf",
      lastSyncedAt: "2025-12-24",
    },
  ],
} as const satisfies Release
