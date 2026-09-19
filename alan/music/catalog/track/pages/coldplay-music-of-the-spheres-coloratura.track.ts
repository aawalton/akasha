import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresColoratura = {
  id: "01a0b9ee-ceb1-70ee-bcb9-3deda6ff3b65",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-coloratura",
  ownLength: 10.284283333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jH7gF7KCk2Lom9gimaKms",
      externalLink: "https://open.spotify.com/track/0jH7gF7KCk2Lom9gimaKms",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Coloratura",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "coloratura|4gzpq5DPGxSnKTe4SA8HAU|617057",
} as const satisfies Track
