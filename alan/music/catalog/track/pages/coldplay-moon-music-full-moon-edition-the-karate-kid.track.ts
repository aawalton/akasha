import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionTheKarateKid = {
  id: "01a0b9ee-cbe7-720a-85f6-272f13fed67d",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-the-karate-kid",
  ownLength: 2.9244333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0cZEkGxb0V9MbpzHzpKp9F",
      externalLink: "https://open.spotify.com/track/0cZEkGxb0V9MbpzHzpKp9F",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Karate Kid",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thekaratekid|4gzpq5DPGxSnKTe4SA8HAU|175466",
  song: "song/coldplay-the-karate-kid",
} as const satisfies Track
