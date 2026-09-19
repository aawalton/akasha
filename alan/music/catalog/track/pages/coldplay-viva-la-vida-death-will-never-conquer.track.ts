import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaDeathWillNeverConquer = {
  id: "01a0b9ee-fbd4-769f-a128-7c957191e6d0",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-death-will-never-conquer",
  ownLength: 1.29755,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XXjAYhslP3i0eDc8LSxDU",
      externalLink: "https://open.spotify.com/track/5XXjAYhslP3i0eDc8LSxDU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Death Will Never Conquer",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "deathwillneverconquer|4gzpq5DPGxSnKTe4SA8HAU|77853",
  song: "song/coldplay-death-will-never-conquer",
} as const satisfies Track
