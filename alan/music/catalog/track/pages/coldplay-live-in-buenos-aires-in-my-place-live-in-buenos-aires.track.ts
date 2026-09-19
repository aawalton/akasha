import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresInMyPlaceLiveInBuenosAires = {
  id: "01a0b9ee-d416-7c5b-a67f-3736c064cd63",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-in-my-place-live-in-buenos-aires",
  ownLength: 4.63,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0o7htzPrB8bP0jnyjiqUdj",
      externalLink: "https://open.spotify.com/track/0o7htzPrB8bP0jnyjiqUdj",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In My Place - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "inmyplaceliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|277800",
  song: "song/coldplay-in-my-place",
} as const satisfies Track
