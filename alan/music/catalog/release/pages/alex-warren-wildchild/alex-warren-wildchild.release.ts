import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenWildchild = {
  id: "01a0a59d-c703-7efd-82dc-7495ac399fc2",
  type: "release",
  slug: "alex-warren-wildchild",
  ownLength: 38.61366666666667,
  ownProgress: 0,
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  publishedAt: "2026-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1es3JGBHQfFNXd4xVktkSs",
      externalLink: "https://open.spotify.com/album/1es3JGBHQfFNXd4xVktkSs",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "WILDCHILD",
} as const satisfies Release
