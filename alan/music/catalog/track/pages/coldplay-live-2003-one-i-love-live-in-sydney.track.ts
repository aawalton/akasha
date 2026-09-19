import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003OneILoveLiveInSydney = {
  id: "01a0b9ee-e643-7f8e-ad32-cd9cfe754679",
  type: "page-type/track",
  slug: "coldplay-live-2003-one-i-love-live-in-sydney",
  ownLength: 5.140433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0bQQv5RqwLmOKNaMcfJ1If",
      externalLink: "https://open.spotify.com/track/0bQQv5RqwLmOKNaMcfJ1If",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One I Love - Live in Sydney",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "oneiloveliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|308426",
  song: "song/coldplay-one-i-love",
} as const satisfies Track
