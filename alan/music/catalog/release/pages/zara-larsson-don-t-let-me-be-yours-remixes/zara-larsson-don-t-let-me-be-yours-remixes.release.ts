import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonDonTLetMeBeYoursRemixes = {
  id: "01a0676a-d71c-7022-abd4-e777db65de35",
  type: "page-type/release",
  slug: "zara-larsson-don-t-let-me-be-yours-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2017-06-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3irfvmKCgbSYGVrNUl7s7C",
      externalLink: "https://open.spotify.com/album/3irfvmKCgbSYGVrNUl7s7C",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Don't Let Me Be Yours (Remixes)",
} as const satisfies Release
