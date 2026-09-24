import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayDonTPanicYouOnlyLiveTwiceLiveFromNorway = {
  id: "01a0b9ef-02ed-776c-a910-e2316fac8050",
  type: "page-type/track",
  slug: "coldplay-don-t-panic-you-only-live-twice-live-from-norway",
  ownLength: 4.1111,
  ownProgress: 4.1111,
  partOfCollections: ["release/coldplay-don-t-panic"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Only Live Twice - Live from Norway",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "youonlylivetwicelivefromnorway|4gzpq5DPGxSnKTe4SA8HAU|246666",
  song: "song/coldplay-you-only-live-twice",
  carriedBy: [
    {
      release: "release/coldplay-don-t-panic",
      discNumber: 1,
      position: 2,
      externalId: "3YdUe6oSvMydx3ph6ZPbPY",
      externalLink: "https://open.spotify.com/track/3YdUe6oSvMydx3ph6ZPbPY",
    },
  ],
} as const satisfies Track
