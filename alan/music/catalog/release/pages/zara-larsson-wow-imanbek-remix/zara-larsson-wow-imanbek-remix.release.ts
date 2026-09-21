import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonWowImanbekRemix = {
  id: "01a0676a-d731-703b-87fe-4f191d1d09fe",
  type: "page-type/release",
  slug: "zara-larsson-wow-imanbek-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2020-10-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0c04EkrQHr79i4rU53qTRQ",
      externalLink: "https://open.spotify.com/album/0c04EkrQHr79i4rU53qTRQ",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "WOW (Imanbek Remix)",
} as const satisfies Release
