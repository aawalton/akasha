import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveTrafficJam = {
  id: "01a0abeb-3be6-79d8-8b30-2733db0a26d2",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-traffic-jam",
  ownLength: 2.1748833333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3QIksrsEQrP9UXhPxNxSG0",
      externalLink: "https://open.spotify.com/track/3QIksrsEQrP9UXhPxNxSG0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Traffic Jam",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "trafficjam|0vn7UBvSQECKJm2817Yf1P|130493",
  song: "song/james-taylor-traffic-jam",
} as const satisfies Track
