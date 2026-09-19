import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassUpErMei = {
  id: "01a0abeb-3adc-7d17-9a12-22c7748ec6c8",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-up-er-mei",
  ownLength: 3.782216666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1N7oGtGMR3GzIN1WpcS62z",
      externalLink: "https://open.spotify.com/track/1N7oGtGMR3GzIN1WpcS62z",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Up Er Mei",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "upermei|0vn7UBvSQECKJm2817Yf1P|226933",
  song: "song/james-taylor-up-er-mei",
} as const satisfies Track
