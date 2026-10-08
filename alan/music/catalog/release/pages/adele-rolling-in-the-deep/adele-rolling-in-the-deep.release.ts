import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleRollingInTheDeep = {
  id: "01a0676a-d728-701b-80bb-6f851387220e",
  type: "page-type/release",
  slug: "adele-rolling-in-the-deep",
  title: "Rolling in the Deep",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-01-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "636ekSSKYrhxvQEHCY07jv",
      externalLink: "https://open.spotify.com/album/636ekSSKYrhxvQEHCY07jv",
      lastSyncedAt: "2026-02-09",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
