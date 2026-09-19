import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresDeMusicaLigeraLiveInBuenosAires = {
  id: "01a0b9ee-d3c8-7738-85db-dff3bc9d791d",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-de-musica-ligera-live-in-buenos-aires",
  ownLength: 6.1551,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1aQKPnGNa5vK7aA6lTm4JS",
      externalLink: "https://open.spotify.com/track/1aQKPnGNa5vK7aA6lTm4JS",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "De Música Ligera - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "demusicaligeraliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|369306",
} as const satisfies Track
