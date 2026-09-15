import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenRescuer = {
  id: "01a0a59d-c8fe-7528-be12-6232b3322a03",
  type: "release",
  slug: "alex-warren-rescuer",
  ownLength: 3.3194333333333335,
  ownProgress: 0,
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  publishedAt: "2026-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3u6kbKgAZyBMCHSMT39ATq",
      externalLink: "https://open.spotify.com/album/3u6kbKgAZyBMCHSMT39ATq",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "RESCUER",
} as const satisfies Release
