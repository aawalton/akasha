import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenIMYourMan = {
  id: "01a0676a-d721-7036-aad0-7bc750259cf0",
  type: "page-type/release",
  slug: "leonard-cohen-i-m-your-man",
  title: "I'm Your Man",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 40.801717,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1988-02-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3gUw30X6A7WEGcRdv1nFr9",
      externalLink: "https://open.spotify.com/album/3gUw30X6A7WEGcRdv1nFr9",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
