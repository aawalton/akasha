import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagRainyDayMan = {
  id: "01a0abeb-4543-74f1-b43f-f31d3e7356eb",
  type: "page-type/track",
  slug: "james-taylor-2-flag-rainy-day-man",
  ownLength: 2.9882166666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6N65FzCD0K0SbCWx73D5o0",
      externalLink: "https://open.spotify.com/track/6N65FzCD0K0SbCWx73D5o0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Rainy Day Man",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "rainydayman|0vn7UBvSQECKJm2817Yf1P|179293",
  song: "song/james-taylor-rainy-day-man",
} as const satisfies Track
