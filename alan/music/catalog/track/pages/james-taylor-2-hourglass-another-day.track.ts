import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassAnotherDay = {
  id: "01a0abeb-3ab5-723a-803c-d3a22cab4885",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-another-day",
  ownLength: 2.3562166666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lu9nUZStqCZrk8mvJvdpS",
      externalLink: "https://open.spotify.com/track/5lu9nUZStqCZrk8mvJvdpS",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Another Day",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "anotherday|0vn7UBvSQECKJm2817Yf1P|141373",
  song: "song/james-taylor-another-day",
} as const satisfies Track
