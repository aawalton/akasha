import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonBadBoysTodayRemix = {
  id: "01a0676a-d718-7006-87ad-e8012eaa096d",
  type: "page-type/release",
  slug: "zara-larsson-bad-boys-today-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2013-12-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5z4d1UdvJ8DchCibnaCF81",
      externalLink: "https://open.spotify.com/album/5z4d1UdvJ8DchCibnaCF81",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Bad Boys (Today Remix)",
} as const satisfies Release
