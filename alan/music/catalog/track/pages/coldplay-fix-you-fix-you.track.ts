import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYouFixYou = {
  id: "01a0b9ee-feb9-709e-8750-0eda609bf014",
  type: "page-type/track",
  slug: "coldplay-fix-you-fix-you",
  ownLength: 4.92555,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-fix-you"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1SWPQul8Zr5jezPUYPcLwR",
      externalLink: "https://open.spotify.com/track/1SWPQul8Zr5jezPUYPcLwR",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "fixyou|4gzpq5DPGxSnKTe4SA8HAU|295533",
} as const satisfies Track
