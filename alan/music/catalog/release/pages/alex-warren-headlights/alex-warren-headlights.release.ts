import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenHeadlights = {
  id: "01a0676a-d720-7008-9571-4c3a2fb9020f",
  type: "page-type/release",
  slug: "alex-warren-headlights",
  title: "Headlights",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-09-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2iZdpmmkZ1FmQh179iOc9z",
      externalLink: "https://open.spotify.com/album/2iZdpmmkZ1FmQh179iOc9z",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
