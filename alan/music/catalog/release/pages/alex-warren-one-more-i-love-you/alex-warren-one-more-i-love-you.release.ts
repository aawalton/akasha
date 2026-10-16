import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenOneMoreILoveYou = {
  id: "01a0676a-d726-702f-baff-950cf0e84ced",
  type: "page-type/release",
  slug: "alex-warren-one-more-i-love-you",
  title: "One More I Love You",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-06-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0xhH21t4xL0EAQCOOsq5aG",
      externalLink: "https://open.spotify.com/album/0xhH21t4xL0EAQCOOsq5aG",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
