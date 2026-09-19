import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYFixYou = {
  id: "01a0b9ee-e452-778d-a22b-508876de3c3f",
  type: "page-type/track",
  slug: "coldplay-x-y-fix-you",
  ownLength: 4.92555,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LVHVU3tWfcxj5aiPFEW4Q",
      externalLink: "https://open.spotify.com/track/7LVHVU3tWfcxj5aiPFEW4Q",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "fixyou|4gzpq5DPGxSnKTe4SA8HAU|295533",
} as const satisfies Track
