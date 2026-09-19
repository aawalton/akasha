import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayShiverShiver = {
  id: "01a0b9ef-0414-76f5-89ae-00ddf986295b",
  type: "page-type/track",
  slug: "coldplay-shiver-shiver",
  ownLength: 5.07,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-shiver"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LFG5WLD8KWSb308OU35q9",
      externalLink: "https://open.spotify.com/track/6LFG5WLD8KWSb308OU35q9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shiver",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "shiver|4gzpq5DPGxSnKTe4SA8HAU|304200",
  song: "song/coldplay-shiver",
} as const satisfies Track
