import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003SeeYouSoonLiveInSydney = {
  id: "01a0b9ee-e673-707f-b1de-bfb62ae78dab",
  type: "page-type/track",
  slug: "coldplay-live-2003-see-you-soon-live-in-sydney",
  ownLength: 3.4851,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4o0q6U6VX4a0VTZ06GOxg2",
      externalLink: "https://open.spotify.com/track/4o0q6U6VX4a0VTZ06GOxg2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "See You Soon - Live in Sydney",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "seeyousoonliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|209106",
} as const satisfies Track
