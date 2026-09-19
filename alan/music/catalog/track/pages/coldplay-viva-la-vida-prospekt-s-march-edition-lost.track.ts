import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionLost = {
  id: "01a0b9ee-dfda-730e-8383-1a6c32de1708",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-lost",
  ownLength: 3.9368833333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YSmynoaeBvITzp3N8iXYU",
      externalLink: "https://open.spotify.com/track/4YSmynoaeBvITzp3N8iXYU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost!",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lost|4gzpq5DPGxSnKTe4SA8HAU|236213",
  song: "song/coldplay-lost",
} as const satisfies Track
