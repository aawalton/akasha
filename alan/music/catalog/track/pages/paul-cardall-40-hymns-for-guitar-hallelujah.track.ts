import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarHallelujah = {
  id: "01a0b4c8-1a44-74dc-95b0-84820fdfcc5a",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-hallelujah",
  ownLength: 4.32355,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2MxiUcXADDlkxVxijM1l8y",
      externalLink: "https://open.spotify.com/track/2MxiUcXADDlkxVxijM1l8y",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hallelujah",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "hallelujah|7FQRbf8gbKw8KZQZAJWxH2|259413",
} as const satisfies Track
