import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFlagsFlags = {
  id: "01a0b9ee-f0a3-7c50-9689-05fa38c665de",
  type: "page-type/track",
  slug: "coldplay-flags-flags",
  ownLength: 3.608216666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-flags"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2RZ8SjEJYJHZ8YCUzls77w",
      externalLink: "https://open.spotify.com/track/2RZ8SjEJYJHZ8YCUzls77w",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Flags",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "flags|4gzpq5DPGxSnKTe4SA8HAU|216493",
  song: "song/coldplay-flags",
} as const satisfies Track
