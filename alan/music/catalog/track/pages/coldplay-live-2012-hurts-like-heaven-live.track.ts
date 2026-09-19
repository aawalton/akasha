import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012HurtsLikeHeavenLive = {
  id: "01a0b9ee-d9ad-759a-9e05-29eb0bb37e36",
  type: "page-type/track",
  slug: "coldplay-live-2012-hurts-like-heaven-live",
  ownLength: 4.272216666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1mw50a4DGRhkdMX7nOoLE4",
      externalLink: "https://open.spotify.com/track/1mw50a4DGRhkdMX7nOoLE4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hurts Like Heaven - Live",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "hurtslikeheavenlive|4gzpq5DPGxSnKTe4SA8HAU|256333",
} as const satisfies Track
