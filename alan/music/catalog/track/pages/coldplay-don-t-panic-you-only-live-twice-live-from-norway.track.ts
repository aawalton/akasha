import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayDonTPanicYouOnlyLiveTwiceLiveFromNorway = {
  id: "01a0b9ef-02ed-776c-a910-e2316fac8050",
  type: "page-type/track",
  slug: "coldplay-don-t-panic-you-only-live-twice-live-from-norway",
  ownLength: 4.1111,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-don-t-panic"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3YdUe6oSvMydx3ph6ZPbPY",
      externalLink: "https://open.spotify.com/track/3YdUe6oSvMydx3ph6ZPbPY",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Only Live Twice - Live from Norway",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "youonlylivetwicelivefromnorway|4gzpq5DPGxSnKTe4SA8HAU|246666",
  song: "song/coldplay-you-only-live-twice",
} as const satisfies Track
