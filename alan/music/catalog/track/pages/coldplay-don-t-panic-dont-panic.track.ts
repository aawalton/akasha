import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayDonTPanicDontPanic = {
  id: "01a0b9ef-02c1-7173-942b-2c9b888eae77",
  type: "page-type/track",
  slug: "coldplay-don-t-panic-dont-panic",
  ownLength: 2.2811,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-don-t-panic"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62XuJOHM33VyWgKwNoj6w9",
      externalLink: "https://open.spotify.com/track/62XuJOHM33VyWgKwNoj6w9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don't Panic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "dontpanic|4gzpq5DPGxSnKTe4SA8HAU|136866",
} as const satisfies Track
