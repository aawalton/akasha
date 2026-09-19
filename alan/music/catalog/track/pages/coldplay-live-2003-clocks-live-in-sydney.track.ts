import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003ClocksLiveInSydney = {
  id: "01a0b9ee-e720-7e29-b670-c72a9c8b1803",
  type: "page-type/track",
  slug: "coldplay-live-2003-clocks-live-in-sydney",
  ownLength: 5.5404333333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cYgC50pVnjPKuh6b0xmZk",
      externalLink: "https://open.spotify.com/track/3cYgC50pVnjPKuh6b0xmZk",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clocks - Live in Sydney",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "clocksliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|332426",
  song: "song/coldplay-clocks",
} as const satisfies Track
