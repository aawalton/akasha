import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineDownInTheHole = {
  id: "01a0abeb-3f5f-7706-adb6-4a795f8aa3ea",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-down-in-the-hole",
  ownLength: 5.252666666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "015PThyoU4QD0siLoLpRmr",
      externalLink: "https://open.spotify.com/track/015PThyoU4QD0siLoLpRmr",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Down In the Hole",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "downinthehole|0vn7UBvSQECKJm2817Yf1P|315160",
  song: "song/james-taylor-down-in-the-hole",
} as const satisfies Track
