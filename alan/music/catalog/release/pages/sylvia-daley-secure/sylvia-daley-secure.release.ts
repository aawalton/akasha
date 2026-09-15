import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sylviaDaleySecure = {
  id: "01a0676a-d728-705c-94f7-938b5dbc3ba5",
  type: "page-type/release",
  slug: "sylvia-daley-secure",
  ownLength: 8.599633333333333,
  ownProgress: 8.599633,
  partOfCollections: ["artist/sylvia-daley"],
  position: 0,
  publishedAt: "2025-07-25",
  rank: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Lk2BacBh9YshF6jWdNO2B",
      externalLink: "https://open.spotify.com/album/6Lk2BacBh9YshF6jWdNO2B",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Secure",
} as const satisfies Release
