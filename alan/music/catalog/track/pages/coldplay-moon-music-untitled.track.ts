import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicUntitled = {
  id: "01a0b9ee-c971-772b-8641-a5f54ff9d218",
  type: "page-type/track",
  slug: "coldplay-moon-music-untitled",
  ownLength: 6.159966666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lCyER2g9iYp4ozZ7iOKat",
      externalLink: "https://open.spotify.com/track/5lCyER2g9iYp4ozZ7iOKat",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "🌈",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|369598",
  song: "song/coldplay-untitled-7",
} as const satisfies Track
