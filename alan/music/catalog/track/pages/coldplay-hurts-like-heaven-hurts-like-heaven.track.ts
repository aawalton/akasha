import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHurtsLikeHeavenHurtsLikeHeaven = {
  id: "01a0b9ee-f949-7f5a-bad4-b3bc491eadcf",
  type: "page-type/track",
  slug: "coldplay-hurts-like-heaven-hurts-like-heaven",
  ownLength: 4.03755,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-hurts-like-heaven"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iOy0ROl5vKp7hJJ5nblNR",
      externalLink: "https://open.spotify.com/track/4iOy0ROl5vKp7hJJ5nblNR",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hurts Like Heaven",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "hurtslikeheaven|4gzpq5DPGxSnKTe4SA8HAU|242253",
  song: "song/coldplay-hurts-like-heaven",
} as const satisfies Track
