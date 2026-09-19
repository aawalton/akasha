import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoLastTime = {
  id: "01a0afa1-bfe3-7189-a360-93298d380d1b",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-last-time",
  ownLength: 3.1416666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7iyBt6IDLHX6I0p2dfLazi",
      externalLink: "https://open.spotify.com/track/7iyBt6IDLHX6I0p2dfLazi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Last Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lasttime|0jW6R8CVyVohuUJVcuweDI|188500",
  song: "song/the-piano-guys-last-time",
} as const satisfies Track
