import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYouFixYouLiveFromArnhemNetherlands = {
  id: "01a0b9ee-ff36-75cb-9ad7-60faa492ded4",
  type: "page-type/track",
  slug: "coldplay-fix-you-fix-you-live-from-arnhem-netherlands",
  ownLength: 6.143266666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-fix-you"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "13wWKawWOKggu7wI15jmFT",
      externalLink: "https://open.spotify.com/track/13wWKawWOKggu7wI15jmFT",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix You - Live from Arnhem, Netherlands",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "fixyoulivefromarnhemnetherlands|4gzpq5DPGxSnKTe4SA8HAU|368596",
  song: "song/coldplay-fix-you",
} as const satisfies Track
