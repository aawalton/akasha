import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012YellowLive = {
  id: "01a0b9ee-da20-7b4d-8bcb-ed9f4c1a1ec7",
  type: "page-type/track",
  slug: "coldplay-live-2012-yellow-live",
  ownLength: 6.866216666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58MrV6J9oS46ViY1N6gTJX",
      externalLink: "https://open.spotify.com/track/58MrV6J9oS46ViY1N6gTJX",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yellow - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yellowlive|4gzpq5DPGxSnKTe4SA8HAU|411973",
  song: "song/coldplay-yellow",
} as const satisfies Track
