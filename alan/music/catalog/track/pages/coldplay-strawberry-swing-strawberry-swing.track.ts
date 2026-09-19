import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayStrawberrySwingStrawberrySwing = {
  id: "01a0b9ee-fa88-7788-bcb3-0ff4d7e0b620",
  type: "page-type/track",
  slug: "coldplay-strawberry-swing-strawberry-swing",
  ownLength: 4.1611,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-strawberry-swing"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06inBM2SUiyg3nGDC2KvUG",
      externalLink: "https://open.spotify.com/track/06inBM2SUiyg3nGDC2KvUG",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Strawberry Swing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "strawberryswing|4gzpq5DPGxSnKTe4SA8HAU|249666",
  song: "song/coldplay-strawberry-swing",
} as const satisfies Track
