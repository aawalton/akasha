import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonOnMyLoveExtendedVersion = {
  id: "01a0676a-d726-7021-9cb8-5772f066e8d3",
  type: "page-type/release",
  slug: "zara-larsson-on-my-love-extended-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-09-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1I3GnXMXlr6sZTwlfPMLly",
      externalLink: "https://open.spotify.com/album/1I3GnXMXlr6sZTwlfPMLly",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "On My Love (Extended Version)",
} as const satisfies Release
