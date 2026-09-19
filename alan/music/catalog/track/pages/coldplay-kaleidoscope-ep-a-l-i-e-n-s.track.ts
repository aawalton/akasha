import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpALIENS = {
  id: "01a0b9ee-f1e9-7357-9f95-0ca83961d3e9",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-a-l-i-e-n-s",
  ownLength: 4.7071,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bS2ADg123NZWfTUsjra8a",
      externalLink: "https://open.spotify.com/track/2bS2ADg123NZWfTUsjra8a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A L I E N S",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "aliens|4gzpq5DPGxSnKTe4SA8HAU|282426",
  song: "song/coldplay-a-l-i-e-n-s",
} as const satisfies Track
