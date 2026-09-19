import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresUntitled5 = {
  id: "01a0b9ee-ce86-7e0a-8986-7d4f3956108a",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-untitled-5",
  ownLength: 3.769,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2wleRXcIPqltoDPLMH5WDa",
      externalLink: "https://open.spotify.com/track/2wleRXcIPqltoDPLMH5WDa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "♾",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|226140",
  song: "song/coldplay-untitled",
} as const satisfies Track
