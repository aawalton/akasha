import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003EverythingsNotLostLiveInSydney = {
  id: "01a0b9ee-e6ba-7a9e-ab3e-4e662d00db2b",
  type: "page-type/track",
  slug: "coldplay-live-2003-everythings-not-lost-live-in-sydney",
  ownLength: 8.7971,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IWbp0yWEF8nNjMLbKF0pU",
      externalLink: "https://open.spotify.com/track/7IWbp0yWEF8nNjMLbKF0pU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everything's Not Lost - Live in Sydney",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everythingsnotlostliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|527826",
} as const satisfies Track
