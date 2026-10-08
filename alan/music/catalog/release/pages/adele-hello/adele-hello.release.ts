import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleHello = {
  id: "01a0676a-d720-7029-ac6e-827796ea3def",
  type: "page-type/release",
  slug: "adele-hello",
  title: "Hello",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-10-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5givPbMFm0AMPUYWulmbzg",
      externalLink: "https://open.spotify.com/album/5givPbMFm0AMPUYWulmbzg",
      lastSyncedAt: "2026-02-09",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
