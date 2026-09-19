import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresMyUniverse = {
  id: "01a0b9ee-ce5f-7ac8-81db-6c801567b3e9",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-my-universe",
  ownLength: 3.7699666666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46HNZY1i7O6jwTA7Slo2PI",
      externalLink: "https://open.spotify.com/track/46HNZY1i7O6jwTA7Slo2PI",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3Nrfpe0tUJi4K4DXYWgMUX", artistName: "BTS" },
  ],
  trackKey: "myuniverse|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|226198",
} as const satisfies Track
