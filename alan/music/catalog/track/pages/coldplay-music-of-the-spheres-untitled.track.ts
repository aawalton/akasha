import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresUntitled = {
  id: "01a0b9ee-cd01-7e6d-8545-67ce4aa80f34",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-untitled",
  ownLength: 0.8864,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1a3G9SNslcKsPAOuIikaxd",
      externalLink: "https://open.spotify.com/track/1a3G9SNslcKsPAOuIikaxd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "🪐",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|53184",
  song: "song/coldplay-untitled-2",
} as const satisfies Track
