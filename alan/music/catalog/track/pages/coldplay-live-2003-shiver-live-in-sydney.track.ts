import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003ShiverLiveInSydney = {
  id: "01a0b9ee-e696-7f35-8a57-67eceaa3e87b",
  type: "page-type/track",
  slug: "coldplay-live-2003-shiver-live-in-sydney",
  ownLength: 5.428883333333333,
  ownProgress: 5.428883333333333,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shiver - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "shiverliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|325733",
  song: "song/coldplay-shiver",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 6,
      externalId: "4CCr8SvmOrHpPKeA5e0ogE",
      externalLink: "https://open.spotify.com/track/4CCr8SvmOrHpPKeA5e0ogE",
    },
  ],
  createdAt: "2026-09-19T13:50:36.694Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
