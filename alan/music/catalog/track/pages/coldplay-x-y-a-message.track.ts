import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYAMessage = {
  id: "01a0b9ee-e4e2-78b0-9942-3e11c8345a4f",
  type: "page-type/track",
  slug: "coldplay-x-y-a-message",
  ownLength: 4.75575,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2w3eXFL86RgxGtDr8bzwgK",
      externalLink: "https://open.spotify.com/track/2w3eXFL86RgxGtDr8bzwgK",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Message",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "amessage|4gzpq5DPGxSnKTe4SA8HAU|285345",
  song: "song/coldplay-a-message",
} as const satisfies Track
