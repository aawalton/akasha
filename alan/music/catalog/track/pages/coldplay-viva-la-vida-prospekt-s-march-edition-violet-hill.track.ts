import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionVioletHill = {
  id: "01a0b9ee-e0b8-7934-a7e6-06afec25634b",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-violet-hill",
  ownLength: 3.7108833333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62UfaFAh45l2jimrgvQRvB",
      externalLink: "https://open.spotify.com/track/62UfaFAh45l2jimrgvQRvB",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Violet Hill",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "violethill|4gzpq5DPGxSnKTe4SA8HAU|222653",
  song: "song/coldplay-violet-hill",
} as const satisfies Track
