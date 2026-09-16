import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversItsGrowing = {
  id: "01a0abeb-33b3-76c4-92bf-b6a9cd084f16",
  type: "page-type/track",
  slug: "james-taylor-2-covers-its-growing",
  ownLength: 4.13155,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "68Qf4tPdL93soTR5wpcDGN",
      externalLink: "https://open.spotify.com/track/68Qf4tPdL93soTR5wpcDGN",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "It's Growing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "itsgrowing|0vn7UBvSQECKJm2817Yf1P|247893",
} as const satisfies Track
