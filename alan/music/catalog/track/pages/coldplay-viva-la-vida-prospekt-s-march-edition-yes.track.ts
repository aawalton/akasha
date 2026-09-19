import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionYes = {
  id: "01a0b9ee-e067-75b9-965d-521bd3a0f1ed",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-yes",
  ownLength: 7.110883333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5kidFrzCBTmWlzKssBbaLb",
      externalLink: "https://open.spotify.com/track/5kidFrzCBTmWlzKssBbaLb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yes|4gzpq5DPGxSnKTe4SA8HAU|426653",
  song: "song/coldplay-yes",
} as const satisfies Track
