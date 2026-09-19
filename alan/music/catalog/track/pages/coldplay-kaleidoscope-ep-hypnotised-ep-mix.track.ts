import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpHypnotisedEpMix = {
  id: "01a0b9ee-f239-794e-8587-05836eadd70b",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-hypnotised-ep-mix",
  ownLength: 6.52355,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HBnZdg7fIQwqMhQhci0VV",
      externalLink: "https://open.spotify.com/track/7HBnZdg7fIQwqMhQhci0VV",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hypnotised - EP Mix",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "hypnotisedepmix|4gzpq5DPGxSnKTe4SA8HAU|391413",
  song: "song/coldplay-hypnotised",
} as const satisfies Track
