import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayClocksAnimals = {
  id: "01a0b9ef-0140-7347-b764-f20d7978af24",
  type: "page-type/track",
  slug: "coldplay-clocks-animals",
  ownLength: 5.554433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-clocks"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "59tjfzA98dum1TXhJ4XWoe",
      externalLink: "https://open.spotify.com/track/59tjfzA98dum1TXhJ4XWoe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Animals",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "animals|4gzpq5DPGxSnKTe4SA8HAU|333266",
  song: "song/coldplay-animals",
} as const satisfies Track
