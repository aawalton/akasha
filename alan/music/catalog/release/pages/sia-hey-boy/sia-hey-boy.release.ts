import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaHeyBoy = {
  id: "01a0676a-d720-7034-880a-d13a755f8b70",
  type: "page-type/release",
  slug: "sia-hey-boy",
  title: "Hey Boy",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-11-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3khsmnYmmsMJ0IMW8OvLKF",
      externalLink: "https://open.spotify.com/album/3khsmnYmmsMJ0IMW8OvLKF",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
