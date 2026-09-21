import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionCemeteriesOfLondon = {
  id: "01a0b9ee-dfb2-758b-b694-4ff320194dfa",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-cemeteries-of-london",
  ownLength: 3.351766666666667,
  ownProgress: 3.351766666666667,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6xbbxvsdy2kC16kUDssPLD",
      externalLink: "https://open.spotify.com/track/6xbbxvsdy2kC16kUDssPLD",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cemeteries of London",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "cemeteriesoflondon|4gzpq5DPGxSnKTe4SA8HAU|201106",
  song: "song/coldplay-cemeteries-of-london",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 2,
      externalId: "6xbbxvsdy2kC16kUDssPLD",
      externalLink: "https://open.spotify.com/track/6xbbxvsdy2kC16kUDssPLD",
    },
  ],
} as const satisfies Track
