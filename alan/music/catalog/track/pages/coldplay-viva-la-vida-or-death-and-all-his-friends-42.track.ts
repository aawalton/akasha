import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriends42 = {
  id: "01a0b9ee-e2e0-7d60-808e-4a85ab0c7ac8",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-42",
  ownLength: 3.9566666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-or-death-and-all-his-friends"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2i2Lz3FDIqYdsJZEWkEaTC",
      externalLink: "https://open.spotify.com/track/2i2Lz3FDIqYdsJZEWkEaTC",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "42",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "42|4gzpq5DPGxSnKTe4SA8HAU|237400",
  song: "song/coldplay-42",
} as const satisfies Track
