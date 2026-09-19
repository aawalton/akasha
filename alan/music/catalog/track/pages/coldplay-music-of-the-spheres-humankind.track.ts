import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresHumankind = {
  id: "01a0b9ee-cd4e-71dd-b92f-7dab2a75e2d2",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-humankind",
  ownLength: 4.445083333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23BO6YozrAXUta1buxFZ80",
      externalLink: "https://open.spotify.com/track/23BO6YozrAXUta1buxFZ80",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Humankind",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "humankind|4gzpq5DPGxSnKTe4SA8HAU|266705",
  song: "song/coldplay-humankind",
} as const satisfies Track
