import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSueMeACappella = {
  id: "01a0676a-d72a-703c-9564-85504bf29587",
  type: "page-type/release",
  slug: "sabrina-carpenter-sue-me-a-cappella",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2019-03-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1xbFduKsdGu9oRbhKH6puf",
      externalLink: "https://open.spotify.com/album/1xbFduKsdGu9oRbhKH6puf",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Sue Me (A Cappella)",
} as const satisfies Release
