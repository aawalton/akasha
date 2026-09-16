import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassLineEmUp = {
  id: "01a0abeb-39d8-7572-b563-9df746600db6",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-line-em-up",
  ownLength: 4.708433333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PbfvaBgQHwUI2NEilk9RN",
      externalLink: "https://open.spotify.com/track/5PbfvaBgQHwUI2NEilk9RN",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Line 'Em Up",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "lineemup|0vn7UBvSQECKJm2817Yf1P|282506",
} as const satisfies Track
