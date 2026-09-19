import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003InMyPlaceLiveInSydney = {
  id: "01a0b9ee-e744-7c9e-9c85-882b360dfeda",
  type: "page-type/track",
  slug: "coldplay-live-2003-in-my-place-live-in-sydney",
  ownLength: 4.2184333333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3osu6FKSmLJJmqnRw5R90G",
      externalLink: "https://open.spotify.com/track/3osu6FKSmLJJmqnRw5R90G",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In My Place - Live in Sydney",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "inmyplaceliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|253106",
  song: "song/coldplay-in-my-place",
} as const satisfies Track
