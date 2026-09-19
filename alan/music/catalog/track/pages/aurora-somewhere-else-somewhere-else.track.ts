import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSomewhereElseSomewhereElse = {
  id: "01a0b637-eb44-7d92-ac58-32de1861b8ee",
  type: "page-type/track",
  slug: "aurora-somewhere-else-somewhere-else",
  ownLength: 4.18955,
  ownProgress: 0,
  partOfCollections: ["release/aurora-somewhere-else"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5AeUaZEtyRCi7t4JHkBus9",
      externalLink: "https://open.spotify.com/track/5AeUaZEtyRCi7t4JHkBus9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "SOMEWHERE ELSE",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "somewhereelse|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|251373",
  song: "song/aurora-somewhere-else",
} as const satisfies Track
