import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesWeNeverChange = {
  id: "01a0b9ee-ea63-7082-b7d8-69535e30a4cb",
  type: "page-type/track",
  slug: "coldplay-parachutes-we-never-change",
  ownLength: 4.156666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5TB6QgrF0RPIxSCGfRDLoe",
      externalLink: "https://open.spotify.com/track/5TB6QgrF0RPIxSCGfRDLoe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We Never Change",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "weneverchange|4gzpq5DPGxSnKTe4SA8HAU|249400",
  song: "song/coldplay-we-never-change",
} as const satisfies Track
