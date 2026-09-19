import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresMidnightLiveInBuenosAires = {
  id: "01a0b9ee-d2da-7511-a778-8657caf2788f",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-midnight-live-in-buenos-aires",
  ownLength: 1.7613333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62OqszvOYSuonp6Buj4P74",
      externalLink: "https://open.spotify.com/track/62OqszvOYSuonp6Buj4P74",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight - Live in Buenos Aires",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "midnightliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|105680",
  song: "song/coldplay-midnight",
} as const satisfies Track
