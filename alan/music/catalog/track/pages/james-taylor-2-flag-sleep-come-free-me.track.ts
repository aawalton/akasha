import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagSleepComeFreeMe = {
  id: "01a0abeb-45b7-7558-893e-7121a6c13f05",
  type: "page-type/track",
  slug: "james-taylor-2-flag-sleep-come-free-me",
  ownLength: 4.702216666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0mSw24Am5LDB04h7DdThjU",
      externalLink: "https://open.spotify.com/track/0mSw24Am5LDB04h7DdThjU",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sleep Come Free Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "sleepcomefreeme|0vn7UBvSQECKJm2817Yf1P|282133",
} as const satisfies Track
