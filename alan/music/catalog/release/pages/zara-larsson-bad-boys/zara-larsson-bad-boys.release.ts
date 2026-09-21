import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonBadBoys = {
  id: "01a0676a-d718-7005-a9d7-fe3408d4c299",
  type: "page-type/release",
  slug: "zara-larsson-bad-boys",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2013-11-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4dYLtOe0GOBxBMMVTOuatl",
      externalLink: "https://open.spotify.com/album/4dYLtOe0GOBxBMMVTOuatl",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Bad Boys",
} as const satisfies Release
