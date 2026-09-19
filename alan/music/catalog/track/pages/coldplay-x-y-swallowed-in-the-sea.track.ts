import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYSwallowedInTheSea = {
  id: "01a0b9ee-e555-751d-bcf9-c3bc253571ef",
  type: "page-type/track",
  slug: "coldplay-x-y-swallowed-in-the-sea",
  ownLength: 3.98335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2u2WL5N3KnQnykOZi3fxL6",
      externalLink: "https://open.spotify.com/track/2u2WL5N3KnQnykOZi3fxL6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Swallowed in the Sea",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "swallowedinthesea|4gzpq5DPGxSnKTe4SA8HAU|239001",
  song: "song/coldplay-swallowed-in-the-sea",
} as const satisfies Track
