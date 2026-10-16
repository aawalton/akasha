import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenGiveYouLove = {
  id: "01a0676a-d71e-706d-8f23-5b5dcb936a29",
  type: "page-type/release",
  slug: "alex-warren-give-you-love",
  title: "Give You Love",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-06-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qOjPBjcMHh2kmizz7qkOG",
      externalLink: "https://open.spotify.com/album/3qOjPBjcMHh2kmizz7qkOG",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
