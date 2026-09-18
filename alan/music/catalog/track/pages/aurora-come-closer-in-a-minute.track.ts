import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserInAMinute = {
  id: "01a0b637-e8c5-70d9-a180-0034c5f0ac4a",
  type: "page-type/track",
  slug: "aurora-come-closer-in-a-minute",
  ownLength: 5.23755,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3v37hY20GcvOr9NnldJIIO",
      externalLink: "https://open.spotify.com/track/3v37hY20GcvOr9NnldJIIO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "IN A MINUTE",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey: "inaminute|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|314253",
} as const satisfies Track
