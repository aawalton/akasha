import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalkTalkFrancoisKDub = {
  id: "01a0b9ee-fdec-70cd-99c3-aa5c7678a176",
  type: "page-type/track",
  slug: "coldplay-talk-talk-francois-k-dub",
  ownLength: 9.060216666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-talk"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "34vsOHBZ1iMFANaeXaRF1Q",
      externalLink: "https://open.spotify.com/track/34vsOHBZ1iMFANaeXaRF1Q",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk - Francois K Dub",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "talkfrancoiskdub|4gzpq5DPGxSnKTe4SA8HAU|543613",
  song: "song/coldplay-talk-francois-k-dub",
} as const satisfies Track
