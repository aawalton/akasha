import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtTrafficJam = {
  id: "01a0abeb-46fc-7d6a-976a-8b94049c06be",
  type: "page-type/track",
  slug: "james-taylor-2-jt-traffic-jam",
  ownLength: 1.9747333333333332,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3vr78UtsASit0Iwhps8HnE",
      externalLink: "https://open.spotify.com/track/3vr78UtsASit0Iwhps8HnE",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Traffic Jam",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "trafficjam|0vn7UBvSQECKJm2817Yf1P|118484",
} as const satisfies Track
