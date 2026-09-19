import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresYellowLiveInBuenosAires = {
  id: "01a0b9ee-d179-746f-add2-3d4db248260d",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-yellow-live-in-buenos-aires",
  ownLength: 5.8411,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2s2Ld1Xm7t88gSVvohNbPL",
      externalLink: "https://open.spotify.com/track/2s2Ld1Xm7t88gSVvohNbPL",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yellow - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yellowliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|350466",
  song: "song/coldplay-yellow",
} as const satisfies Track
