import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesParachutes = {
  id: "01a0b9ee-ea15-70c3-a8ec-b0db74c60f88",
  type: "page-type/track",
  slug: "coldplay-parachutes-parachutes",
  ownLength: 0.77,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4qzoHxgp42ylb18ga1SWTL",
      externalLink: "https://open.spotify.com/track/4qzoHxgp42ylb18ga1SWTL",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Parachutes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "parachutes|4gzpq5DPGxSnKTe4SA8HAU|46200",
  song: "song/coldplay-parachutes",
} as const satisfies Track
