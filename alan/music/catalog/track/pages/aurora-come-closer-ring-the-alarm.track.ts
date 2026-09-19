import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserRingTheAlarm = {
  id: "01a0b637-e777-775e-9c92-f0e500c5dde8",
  type: "page-type/track",
  slug: "aurora-come-closer-ring-the-alarm",
  ownLength: 5.52355,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3i3Qa9DLMVeexn7ighFoVS",
      externalLink: "https://open.spotify.com/track/3i3Qa9DLMVeexn7ighFoVS",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "RING THE ALARM",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "ringthealarm|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|331413",
  song: "song/aurora-ring-the-alarm",
} as const satisfies Track
