import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeArabesque = {
  id: "01a0b9ee-cfc9-747d-bbfb-83eadb7fdb36",
  type: "page-type/track",
  slug: "coldplay-everyday-life-arabesque",
  ownLength: 5.671333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ZlVUhjO8c0bOx1D2Btznf",
      externalLink: "https://open.spotify.com/track/0ZlVUhjO8c0bOx1D2Btznf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Arabesque",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "arabesque|4gzpq5DPGxSnKTe4SA8HAU|340280",
  song: "song/coldplay-arabesque",
} as const satisfies Track
