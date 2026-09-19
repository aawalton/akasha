import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsKaleidoscope = {
  id: "01a0b9ee-d5e7-7676-979e-ba06a0c280ae",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-kaleidoscope",
  ownLength: 1.8642166666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IX7VAXujvcZ3e1PG7sGP7",
      externalLink: "https://open.spotify.com/track/7IX7VAXujvcZ3e1PG7sGP7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kaleidoscope",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "kaleidoscope|4gzpq5DPGxSnKTe4SA8HAU|111853",
  song: "song/coldplay-kaleidoscope",
} as const satisfies Track
