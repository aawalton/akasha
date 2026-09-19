import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAscensusAscensusChristiOrchestraMotif = {
  id: "01a0b4c8-244e-7b83-9837-b176ad7ba318",
  type: "page-type/track",
  slug: "paul-cardall-ascensus-ascensus-christi-orchestra-motif",
  ownLength: 1.4333333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ascensus"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0IFieQoxzP40M7ZeV05oHc",
      externalLink: "https://open.spotify.com/track/0IFieQoxzP40M7ZeV05oHc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ascensus Christi: Orchestra Motif",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ascensuschristiorchestramotif|7FQRbf8gbKw8KZQZAJWxH2|86000",
  song: "song/paul-cardall-ascensus-christi-orchestra-motif",
} as const satisfies Track
