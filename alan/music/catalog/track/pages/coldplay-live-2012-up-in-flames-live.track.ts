import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012UpInFlamesLive = {
  id: "01a0b9ee-da98-7a4b-a43a-c49c25b1649c",
  type: "page-type/track",
  slug: "coldplay-live-2012-up-in-flames-live",
  ownLength: 3.2973333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7cmWfBUtzV8DQTw47nA5OD",
      externalLink: "https://open.spotify.com/track/7cmWfBUtzV8DQTw47nA5OD",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up in Flames - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "upinflameslive|4gzpq5DPGxSnKTe4SA8HAU|197840",
  song: "song/coldplay-up-in-flames",
} as const satisfies Track
