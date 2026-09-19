import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesMagic = {
  id: "01a0b9ee-d837-73b2-9f0d-eda329eca4a7",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-magic",
  ownLength: 4.750233333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23khhseCLQqVMCIT1WMAns",
      externalLink: "https://open.spotify.com/track/23khhseCLQqVMCIT1WMAns",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Magic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "magic|4gzpq5DPGxSnKTe4SA8HAU|285014",
} as const satisfies Track
