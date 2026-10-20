import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaAwakeTonight = {
  id: "01a0a59b-f262-7d8c-b0bc-6118f2e9947a",
  type: "page-type/release",
  slug: "sia-awake-tonight",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sia"],
  position: 0,
  publishedAt: "2026-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JVYUljpOqknjBvxeSIFB0",
      externalLink: "https://open.spotify.com/album/2JVYUljpOqknjBvxeSIFB0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Awake Tonight",
  createdAt: "2026-09-15T15:07:35.906Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
