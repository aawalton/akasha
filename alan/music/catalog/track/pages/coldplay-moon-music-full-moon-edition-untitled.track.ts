import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionUntitled = {
  id: "01a0b9ee-caee-73f0-a3f0-fe64cd77ac4f",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-untitled",
  ownLength: 6.159966666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5kHwM1BRcIukEIy8x0emV8",
      externalLink: "https://open.spotify.com/track/5kHwM1BRcIukEIy8x0emV8",
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
