import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMidnightSun = {
  id: "01a0676a-d724-7061-85a8-3380161945e3",
  type: "page-type/release",
  slug: "zara-larsson-midnight-sun",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2025-06-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "014U2yqVgeCNqykPGzgyki",
      externalLink: "https://open.spotify.com/album/014U2yqVgeCNqykPGzgyki",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Midnight Sun",
} as const satisfies Release
