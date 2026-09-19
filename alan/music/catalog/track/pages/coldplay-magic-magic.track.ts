import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMagicMagic = {
  id: "01a0b9ee-f7b3-7be3-b9f3-b22d177859bc",
  type: "page-type/track",
  slug: "coldplay-magic-magic",
  ownLength: 4.750233333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-magic"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27jdUE1EYDSXZqhjuNxLem",
      externalLink: "https://open.spotify.com/track/27jdUE1EYDSXZqhjuNxLem",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Magic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "magic|4gzpq5DPGxSnKTe4SA8HAU|285014",
} as const satisfies Track
