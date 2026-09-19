import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayBrothersSistersBrothersSisters = {
  id: "01a0b9ef-0556-7163-9d79-02820eebc294",
  type: "page-type/track",
  slug: "coldplay-brothers-sisters-brothers-sisters",
  ownLength: 4.092216666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-brothers-sisters"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BMIgTmZAihjW5MKEo7gvV",
      externalLink: "https://open.spotify.com/track/6BMIgTmZAihjW5MKEo7gvV",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brothers & Sisters",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "brotherssisters|4gzpq5DPGxSnKTe4SA8HAU|245533",
} as const satisfies Track
