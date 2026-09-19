import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresAdventureOfALifetimeLiveInBuenosAires = {
  id: "01a0b9ee-d3a1-70a4-bd45-7b4414025233",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-adventure-of-a-lifetime-live-in-buenos-aires",
  ownLength: 5.1091,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ERJLifTcWBFNZRl6QAqEC",
      externalLink: "https://open.spotify.com/track/3ERJLifTcWBFNZRl6QAqEC",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Adventure of a Lifetime - Live in Buenos Aires",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "adventureofalifetimeliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|306546",
  song: "song/coldplay-adventure-of-a-lifetime",
} as const satisfies Track
