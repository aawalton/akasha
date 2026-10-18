import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonBreakaway = {
  id: "01a0676a-d719-7035-aa54-0e36446f6750",
  type: "page-type/release",
  slug: "kelly-clarkson-breakaway",
  title: "Breakaway",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2004-01-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5gDAEao3VxFdbm8vS0koQq",
      externalLink: "https://open.spotify.com/album/5gDAEao3VxFdbm8vS0koQq",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
