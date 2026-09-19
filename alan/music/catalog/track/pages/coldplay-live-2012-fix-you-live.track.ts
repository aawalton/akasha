import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012FixYouLive = {
  id: "01a0b9ee-db95-7921-9b7d-b47d58c46008",
  type: "page-type/track",
  slug: "coldplay-live-2012-fix-you-live",
  ownLength: 5.010883333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6L0uCWhXyBNncoDgfEvK1R",
      externalLink: "https://open.spotify.com/track/6L0uCWhXyBNncoDgfEvK1R",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix You - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "fixyoulive|4gzpq5DPGxSnKTe4SA8HAU|300653",
  song: "song/coldplay-fix-you",
} as const satisfies Track
