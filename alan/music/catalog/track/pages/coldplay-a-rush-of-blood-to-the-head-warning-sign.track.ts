import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadWarningSign = {
  id: "01a0b9ee-e889-7099-ba3d-68637a4c147c",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-warning-sign",
  ownLength: 5.518883333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4bPkBHKLKd9WHizsvM2zV3",
      externalLink: "https://open.spotify.com/track/4bPkBHKLKd9WHizsvM2zV3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Warning Sign",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "warningsign|4gzpq5DPGxSnKTe4SA8HAU|331133",
  song: "song/coldplay-warning-sign",
} as const satisfies Track
