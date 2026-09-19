import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayUpUpFreedoRemixUpUpFreedoRemix = {
  id: "01a0b9ee-f4a5-712f-991e-3eaf7f430d4c",
  type: "page-type/track",
  slug: "coldplay-up-up-freedo-remix-up-up-freedo-remix",
  ownLength: 3.5049,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-up-up-freedo-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2KIgC0WnwwcDPgv8ClxXfi",
      externalLink: "https://open.spotify.com/track/2KIgC0WnwwcDPgv8ClxXfi",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up&Up - Freedo Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "2b6Cbp1cgD0hwisrGbKsZJ", artistName: "Freedo" },
  ],
  trackKey: "upupfreedoremix|2b6Cbp1cgD0hwisrGbKsZJ,4gzpq5DPGxSnKTe4SA8HAU|210294",
  song: "song/coldplay-up-up",
} as const satisfies Track
