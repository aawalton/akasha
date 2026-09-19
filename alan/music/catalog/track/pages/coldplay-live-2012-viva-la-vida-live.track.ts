import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012VivaLaVidaLive = {
  id: "01a0b9ee-dac0-798b-b5fd-f93e7715d446",
  type: "page-type/track",
  slug: "coldplay-live-2012-viva-la-vida-live",
  ownLength: 4.972216666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ZV67iTfNpW3ueMCELLiSX",
      externalLink: "https://open.spotify.com/track/5ZV67iTfNpW3ueMCELLiSX",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Viva La Vida - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "vivalavidalive|4gzpq5DPGxSnKTe4SA8HAU|298333",
  song: "song/coldplay-viva-la-vida",
} as const satisfies Track
