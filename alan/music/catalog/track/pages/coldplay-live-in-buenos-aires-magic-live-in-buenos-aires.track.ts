import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresMagicLiveInBuenosAires = {
  id: "01a0b9ee-d268-7ad7-8abe-edc763eb8320",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-magic-live-in-buenos-aires",
  ownLength: 4.764,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6EqxH0njjZuuI3gFZN3Z1o",
      externalLink: "https://open.spotify.com/track/6EqxH0njjZuuI3gFZN3Z1o",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Magic - Live in Buenos Aires",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "magicliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|285840",
  song: "song/coldplay-magic",
} as const satisfies Track
