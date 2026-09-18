import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRingTheAlarmRingTheAlarm = {
  id: "01a0b637-fe30-7c36-93a2-9138f71ce46d",
  type: "page-type/track",
  slug: "aurora-ring-the-alarm-ring-the-alarm",
  ownLength: 5.52355,
  ownProgress: 0,
  partOfCollections: ["release/aurora-ring-the-alarm"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ewxZwUwLeMZEMWF1CRLeG",
      externalLink: "https://open.spotify.com/track/4ewxZwUwLeMZEMWF1CRLeG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "RING THE ALARM",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "ringthealarm|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|331413",
} as const satisfies Track
