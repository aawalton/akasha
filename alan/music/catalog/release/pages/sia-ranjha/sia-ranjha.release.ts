import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaRanjha = {
  id: "01a0a59b-f2ac-7d74-9c41-f84186580b70",
  type: "page-type/release",
  slug: "sia-ranjha",
  ownLength: 3.067633333333333,
  ownProgress: 0,
  partOfCollections: ["artist/sia"],
  position: 0,
  publishedAt: "2026-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2b2JX5znXI5KCCVnx4XotX",
      externalLink: "https://open.spotify.com/album/2b2JX5znXI5KCCVnx4XotX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Ranjha",
} as const satisfies Release
