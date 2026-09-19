import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeWotwPotp = {
  id: "01a0b9ee-cfa7-7bca-9148-50a545e06348",
  type: "page-type/track",
  slug: "coldplay-everyday-life-wotw-potp",
  ownLength: 1.2822166666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7jib2tJjQ82kTIZZATMvAK",
      externalLink: "https://open.spotify.com/track/7jib2tJjQ82kTIZZATMvAK",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WOTW / POTP",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "wotwpotp|4gzpq5DPGxSnKTe4SA8HAU|76933",
} as const satisfies Track
