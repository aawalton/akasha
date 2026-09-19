import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEdition42 = {
  id: "01a0b9ee-e003-7ecb-a80d-b3db3dfac58e",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-42",
  ownLength: 3.9566666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50CsvQKRsEd9wiYMcdsHeg",
      externalLink: "https://open.spotify.com/track/50CsvQKRsEd9wiYMcdsHeg",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "42",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "42|4gzpq5DPGxSnKTe4SA8HAU|237400",
  song: "song/coldplay-42",
} as const satisfies Track
