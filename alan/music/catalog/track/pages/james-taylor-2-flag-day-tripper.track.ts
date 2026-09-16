import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagDayTripper = {
  id: "01a0abeb-44b3-7539-b2fe-c34432af36da",
  type: "page-type/track",
  slug: "james-taylor-2-flag-day-tripper",
  ownLength: 4.406666666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45goHlfgQSRpaJyMccZ8AT",
      externalLink: "https://open.spotify.com/track/45goHlfgQSRpaJyMccZ8AT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Day Tripper",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "daytripper|0vn7UBvSQECKJm2817Yf1P|264400",
} as const satisfies Track
