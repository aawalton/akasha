import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassHangnail = {
  id: "01a0abeb-3b99-7470-9465-85384b713f04",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-hangnail",
  ownLength: 2.35555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7onpA2Bnovg4a2mhcbOrMf",
      externalLink: "https://open.spotify.com/track/7onpA2Bnovg4a2mhcbOrMf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Hangnail",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "hangnail|0vn7UBvSQECKJm2817Yf1P|141333",
  song: "song/james-taylor-hangnail",
} as const satisfies Track
