import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassUpFromYourLife = {
  id: "01a0abeb-3b02-78fc-b946-f64b725b414f",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-up-from-your-life",
  ownLength: 5.246216666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3McJMHQcLIxOhl4GFVOkKX",
      externalLink: "https://open.spotify.com/track/3McJMHQcLIxOhl4GFVOkKX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Up From Your Life",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "upfromyourlife|0vn7UBvSQECKJm2817Yf1P|314773",
} as const satisfies Track
