import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003ClocksLiveInSydney = {
  id: "01a0b9ee-e720-7e29-b670-c72a9c8b1803",
  type: "page-type/track",
  slug: "coldplay-live-2003-clocks-live-in-sydney",
  ownLength: 5.5404333333333335,
  ownProgress: 5.5404333333333335,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "Clocks - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "clocksliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|332426",
  song: "song/coldplay-clocks",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 10,
      externalId: "3cYgC50pVnjPKuh6b0xmZk",
      externalLink: "https://open.spotify.com/track/3cYgC50pVnjPKuh6b0xmZk",
    },
  ],
} as const satisfies Track
