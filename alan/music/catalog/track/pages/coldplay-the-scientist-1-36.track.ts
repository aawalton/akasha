import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheScientist136 = {
  id: "01a0b9ef-0241-7bee-921d-22455852ffc7",
  type: "page-type/track",
  slug: "coldplay-the-scientist-1-36",
  ownLength: 2.0917666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-scientist"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7fSFdF4ymvjiOIr1EzB2pu",
      externalLink: "https://open.spotify.com/track/7fSFdF4ymvjiOIr1EzB2pu",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "1.36",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "136|4gzpq5DPGxSnKTe4SA8HAU|125506",
  song: "song/coldplay-1-36",
} as const satisfies Track
