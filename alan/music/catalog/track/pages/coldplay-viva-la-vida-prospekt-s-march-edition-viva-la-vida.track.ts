import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionVivaLaVida = {
  id: "01a0b9ee-e091-7375-a7a6-6492033f49d4",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-viva-la-vida",
  ownLength: 4.03955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3zzwBtusqxBiGRsGpsnN3F",
      externalLink: "https://open.spotify.com/track/3zzwBtusqxBiGRsGpsnN3F",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Viva La Vida",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "vivalavida|4gzpq5DPGxSnKTe4SA8HAU|242373",
  song: "song/coldplay-viva-la-vida",
} as const satisfies Track
