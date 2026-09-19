import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesHighSpeed = {
  id: "01a0b9ee-ea3b-7d5b-a1e8-27117dd4b5ff",
  type: "page-type/track",
  slug: "coldplay-parachutes-high-speed",
  ownLength: 4.2744333333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2DHgvPQD1jApRnT1DBZdrS",
      externalLink: "https://open.spotify.com/track/2DHgvPQD1jApRnT1DBZdrS",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "High Speed",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "highspeed|4gzpq5DPGxSnKTe4SA8HAU|256466",
} as const satisfies Track
