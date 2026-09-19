import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaVivaLaVida = {
  id: "01a0b9ee-fbb3-764a-a4b0-d1bfdd1b4a8a",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-viva-la-vida",
  ownLength: 4.03955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WrUT7FOAlDscRWU7ndmyd",
      externalLink: "https://open.spotify.com/track/6WrUT7FOAlDscRWU7ndmyd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Viva La Vida",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "vivalavida|4gzpq5DPGxSnKTe4SA8HAU|242373",
  song: "song/coldplay-viva-la-vida",
} as const satisfies Track
