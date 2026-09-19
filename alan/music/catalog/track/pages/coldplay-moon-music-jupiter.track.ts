import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicJupiter = {
  id: "01a0b9ee-c92a-70e4-a5ac-dbed3d528a7e",
  type: "page-type/track",
  slug: "coldplay-moon-music-jupiter",
  ownLength: 4.008466666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3EbRbM7qyJq9qjRqDIwBTO",
      externalLink: "https://open.spotify.com/track/3EbRbM7qyJq9qjRqDIwBTO",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "JUPiTER",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "jupiter|4gzpq5DPGxSnKTe4SA8HAU|240508",
  song: "song/coldplay-jupiter",
} as const satisfies Track
