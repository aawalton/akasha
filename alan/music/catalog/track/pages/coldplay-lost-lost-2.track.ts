import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLostLost2 = {
  id: "01a0b9ee-fb4c-729c-ade2-ca00c3a7eaf8",
  type: "page-type/track",
  slug: "coldplay-lost-lost-2",
  ownLength: 3.7008833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-lost"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7lFdAhKhZs5lpjAVX8OzIj",
      externalLink: "https://open.spotify.com/track/7lFdAhKhZs5lpjAVX8OzIj",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lost|4gzpq5DPGxSnKTe4SA8HAU|222053",
} as const satisfies Track
