import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sylviaDaleyMyOwnRules = {
  id: "01a0a6c3-6bec-761b-8a87-895cd718779c",
  type: "page-type/release",
  slug: "sylvia-daley-my-own-rules",
  ownLength: 2.5697833333333335,
  ownProgress: 0,
  partOfCollections: ["artist/sylvia-daley"],
  position: 0,
  publishedAt: "2026-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0B4brr9R245NhhWmjC0Qiu",
      externalLink: "https://open.spotify.com/album/0B4brr9R245NhhWmjC0Qiu",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "My Own Rules",
} as const satisfies Release
