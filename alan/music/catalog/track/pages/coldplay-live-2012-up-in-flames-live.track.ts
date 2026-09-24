import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012UpInFlamesLive = {
  id: "01a0b9ee-da98-7a4b-a43a-c49c25b1649c",
  type: "page-type/track",
  slug: "coldplay-live-2012-up-in-flames-live",
  ownLength: 3.2973333333333334,
  ownProgress: 3.2973333333333334,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up in Flames - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "upinflameslive|4gzpq5DPGxSnKTe4SA8HAU|197840",
  song: "song/coldplay-up-in-flames",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 8,
      externalId: "7cmWfBUtzV8DQTw47nA5OD",
      externalLink: "https://open.spotify.com/track/7cmWfBUtzV8DQTw47nA5OD",
    },
  ],
} as const satisfies Track
