import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonSomeone = {
  id: "01a0676a-d729-7056-9e2c-cf1f05b56598",
  type: "page-type/release",
  slug: "kelly-clarkson-someone",
  title: "Someone",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 3.664533,
  ownProgress: 3.664533,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-02-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6r6eiAK49nJHNHS3nFj5Hp",
      externalLink: "https://open.spotify.com/album/6r6eiAK49nJHNHS3nFj5Hp",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
