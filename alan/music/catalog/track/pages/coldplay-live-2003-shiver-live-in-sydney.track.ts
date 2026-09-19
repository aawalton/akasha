import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003ShiverLiveInSydney = {
  id: "01a0b9ee-e696-7f35-8a57-67eceaa3e87b",
  type: "page-type/track",
  slug: "coldplay-live-2003-shiver-live-in-sydney",
  ownLength: 5.428883333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4CCr8SvmOrHpPKeA5e0ogE",
      externalLink: "https://open.spotify.com/track/4CCr8SvmOrHpPKeA5e0ogE",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shiver - Live in Sydney",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "shiverliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|325733",
  song: "song/coldplay-shiver",
} as const satisfies Track
