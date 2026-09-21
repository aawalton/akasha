import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonAllTheTimeDonDiabloRemix = {
  id: "01a0676a-d716-7026-8b1a-b9e44752cb76",
  type: "page-type/release",
  slug: "zara-larsson-all-the-time-don-diablo-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2019-07-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1HoSmj2eLcsrR0vE9gThr4",
      externalLink: "https://open.spotify.com/album/1HoSmj2eLcsrR0vE9gThr4",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "All the Time (Don Diablo Remix)",
} as const satisfies Release
